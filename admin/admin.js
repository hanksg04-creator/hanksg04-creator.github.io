const cfg=window.SITE_CONFIG||{};
const configured=Boolean(cfg.supabaseUrl&&cfg.supabaseAnonKey&&!cfg.supabaseUrl.includes("YOUR_"));
const setupCard=document.getElementById("setupCard"),loginCard=document.getElementById("loginCard"),app=document.getElementById("app"),logoutBtn=document.getElementById("logoutBtn");
let db=null,currentUser=null,posts=[],selectedId=null;
const q=id=>document.getElementById(id);
const categoryLabels={life:"随想",investing:"投资",engineering:"工程"};

if(!configured){setupCard.classList.remove("hidden");}
else{
  db=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);
  init();
}

async function init(){
  const {data:{session}}=await db.auth.getSession();
  if(session) await enter(session.user); else loginCard.classList.remove("hidden");
  db.auth.onAuthStateChange(async(_,session)=>{if(session) await enter(session.user);});
}

q("loginForm").addEventListener("submit",async e=>{
  e.preventDefault(); q("loginMessage").textContent="正在登录…";
  const {data,error}=await db.auth.signInWithPassword({email:q("email").value.trim(),password:q("password").value});
  if(error) q("loginMessage").textContent=error.message;
  else if(data.user) q("loginMessage").textContent="";
});

logoutBtn.addEventListener("click",async()=>{await db.auth.signOut();location.reload();});

async function enter(user){
  currentUser=user;
  const {error}=await db.from("posts").select("id").limit(1);
  if(error){
    loginCard.classList.remove("hidden");
    q("loginMessage").textContent="登录成功，但这个账号没有管理员权限，或数据库还未完成初始化。";
    await db.auth.signOut();
    return;
  }
  loginCard.classList.add("hidden");app.classList.remove("hidden");logoutBtn.classList.remove("hidden");
  await Promise.all([loadPosts(),loadSettings()]);
}

async function loadPosts(){
  const {data,error}=await db.from("posts").select("*").order("created_at",{ascending:false});
  if(error){q("saveStatus").textContent=error.message;return}
  posts=data||[];renderPostList();
}

function renderPostList(){
  q("postList").innerHTML=posts.length?posts.map(p=>`<div class="post-item ${p.id===selectedId?"active":""}" data-id="${p.id}">
    <h3>${escapeHtml(p.title||"未命名")}</h3><div class="post-meta">${p.published?"已发布":"草稿"} · ${categoryLabels[p.category]||p.category}</div>
  </div>`).join(""):`<p class="message">还没有文章。点“新建”写第一篇。</p>`;
}
q("postList").addEventListener("click",e=>{const item=e.target.closest(".post-item");if(item)selectPost(item.dataset.id)});
q("newPostBtn").addEventListener("click",()=>resetEditor());

function resetEditor(){
  selectedId=null;q("postForm").reset();q("postId").value="";q("published").value="false";q("editorTitle").textContent="新文章";q("deleteBtn").classList.add("hidden");renderPostList();
}
function selectPost(id){
  const p=posts.find(x=>String(x.id)===String(id));if(!p)return;
  selectedId=p.id;q("postId").value=p.id;q("title").value=p.title||"";q("category").value=p.category||"life";q("published").value=String(Boolean(p.published));q("summary").value=p.summary||"";q("body").value=p.body||"";q("editorTitle").textContent="编辑文章";q("deleteBtn").classList.remove("hidden");renderPostList();
}

q("postForm").addEventListener("submit",async e=>{
  e.preventDefault();q("saveStatus").textContent="保存中…";
  const payload={title:q("title").value.trim(),category:q("category").value,summary:q("summary").value.trim(),body:q("body").value.trim(),published:q("published").value==="true",updated_at:new Date().toISOString()};
  if(payload.published) payload.published_at=new Date().toISOString();
  let result;
  if(selectedId) result=await db.from("posts").update(payload).eq("id",selectedId);
  else result=await db.from("posts").insert(payload);
  if(result.error){q("saveStatus").textContent=result.error.message;return}
  q("saveStatus").textContent=payload.published?"已发布":"草稿已保存";await loadPosts();if(!selectedId)resetEditor();
});

q("deleteBtn").addEventListener("click",async()=>{
  if(!selectedId||!confirm("确定删除这篇文章？"))return;
  const {error}=await db.from("posts").delete().eq("id",selectedId);
  if(error){q("saveStatus").textContent=error.message;return}
  resetEditor();await loadPosts();q("saveStatus").textContent="已删除";
});

document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
  q("postsTab").classList.toggle("hidden",btn.dataset.tab!=="posts");
  q("homepageTab").classList.toggle("hidden",btn.dataset.tab!=="homepage");
}));

async function loadSettings(){
  const {data}=await db.from("site_settings").select("*").eq("id","main").maybeSingle();
  const s=data||{};
  q("displayName").value=s.display_name||"Steven Gao";q("legalName").value=s.legal_name||"Gao Tianyu";
  q("heroTitle").value=s.hero_title||"记录我正在做的事，以及我真正相信的东西。";
  q("heroCopy").value=s.hero_copy||"";q("focusTitle").value=s.focus_title||"学习、项目与长期积累";
  q("focusBody").value=s.focus_body||"";q("aboutBody").value=s.about_body||"";q("locationText").value=s.location_text||"Malaysia / Online";
}
q("settingsForm").addEventListener("submit",async e=>{
  e.preventDefault();q("settingsStatus").textContent="保存中…";
  const payload={id:"main",display_name:q("displayName").value.trim(),legal_name:q("legalName").value.trim(),hero_title:q("heroTitle").value.trim(),hero_copy:q("heroCopy").value.trim(),focus_title:q("focusTitle").value.trim(),focus_body:q("focusBody").value.trim(),about_body:q("aboutBody").value.trim(),location_text:q("locationText").value.trim(),updated_at:new Date().toISOString()};
  const {error}=await db.from("site_settings").upsert(payload,{onConflict:"id"});
  q("settingsStatus").textContent=error?error.message:"首页已保存";
});
function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
resetEditor();