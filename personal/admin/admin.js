const cfg=window.SITE_CONFIG||{};
const db=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);
let currentId=null;
let rows=[];

const $=id=>document.getElementById(id);
const msg=(id,text)=>{$(id).textContent=text||"";};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));

async function isAdmin(user){
  if(!user)return false;
  const {data,error}=await db.from("site_admins")
    .select("user_id")
    .eq("user_id",user.id)
    .maybeSingle();
  return !error&&!!data;
}

async function enter(user){
  if(!(await isAdmin(user))){
    await db.auth.signOut();
    $("loginCard").classList.remove("hidden");
    $("studio").classList.add("hidden");
    msg("loginMsg","这个账号没有管理员权限。");
    return;
  }
  $("loginCard").classList.add("hidden");
  $("studio").classList.remove("hidden");
  $("logoutBtn").classList.remove("hidden");
  await Promise.all([loadPosts(),loadSettings()]);
}

$("loginForm").addEventListener("submit",async e=>{
  e.preventDefault();
  msg("loginMsg","正在登录…");
  const {data,error}=await db.auth.signInWithPassword({
    email:$("email").value.trim(),
    password:$("password").value
  });
  if(error){msg("loginMsg",error.message);return;}
  msg("loginMsg","");
  await enter(data.user);
});

$("logoutBtn").addEventListener("click",async()=>{
  await db.auth.signOut();
  location.reload();
});

async function loadPosts(){
  const {data,error}=await db.from("personal_posts").select("*").order("created_at",{ascending:false});
  if(error){msg("saveMsg",error.message);return;}
  rows=data||[];
  renderList();
}

function renderList(){
  const el=$("postList");
  if(!rows.length){el.innerHTML='<p class="msg">还没有记录。</p>';return;}
  el.innerHTML=rows.map(r=>`
    <div class="post-row ${String(r.id)===String(currentId)?"active":""}" data-id="${r.id}">
      <h3>${esc(r.title)}</h3>
      <div class="post-meta">
        <span class="badge">${r.source==="ai"?"AI Daily":"我的记录"}</span>
        <span class="badge">${r.visibility==="private"?"私密":"公开"}</span>
        <span>${r.published?"已发布":"草稿"}</span>
      </div>
    </div>`).join("");
}

$("postList").addEventListener("click",e=>{
  const row=e.target.closest(".post-row");
  if(!row)return;
  selectPost(row.dataset.id);
});

function selectPost(id){
  const r=rows.find(x=>String(x.id)===String(id));
  if(!r)return;
  currentId=r.id;
  $("editorMode").textContent=r.source==="ai"?"EDIT AI DAILY":"EDIT NOTE";
  $("title").value=r.title||"";
  $("summary").value=r.summary||"";
  $("body").value=r.body||"";
  $("source").value=r.source||"user";
  $("visibility").value=r.visibility||"public";
  $("published").value=String(!!r.published);
  $("deleteBtn").classList.remove("hidden");
  msg("saveMsg","");
  renderList();
}

function resetEditor(){
  currentId=null;
  $("editorMode").textContent="NEW NOTE";
  $("title").value="";
  $("summary").value="";
  $("body").value="";
  $("source").value="user";
  $("visibility").value="public";
  $("published").value="true";
  $("deleteBtn").classList.add("hidden");
  msg("saveMsg","");
  renderList();
}

$("newBtn").addEventListener("click",resetEditor);

$("saveBtn").addEventListener("click",async()=>{
  const title=$("title").value.trim();
  if(!title){msg("saveMsg","请先填写标题。");return;}
  const published=$("published").value==="true";
  const existing=rows.find(x=>String(x.id)===String(currentId));
  const payload={
    title,
    summary:$("summary").value.trim(),
    body:$("body").value.trim(),
    source:$("source").value,
    visibility:$("visibility").value,
    published,
    updated_at:new Date().toISOString()
  };
  if(published&&!existing?.published_at)payload.published_at=new Date().toISOString();
  if(!published&&existing?.published_at)payload.published_at=existing.published_at;

  let result;
  if(currentId){
    result=await db.from("personal_posts").update(payload).eq("id",currentId);
  }else{
    if(published&&!payload.published_at)payload.published_at=new Date().toISOString();
    result=await db.from("personal_posts").insert(payload);
  }
  if(result.error){msg("saveMsg",result.error.message);return;}
  msg("saveMsg","已保存。");
  await loadPosts();
  if(!currentId)resetEditor();
});

$("deleteBtn").addEventListener("click",async()=>{
  if(!currentId||!confirm("确定删除这条记录吗？"))return;
  const {error}=await db.from("personal_posts").delete().eq("id",currentId);
  if(error){msg("saveMsg",error.message);return;}
  resetEditor();
  await loadPosts();
});

async function loadSettings(){
  const {data,error}=await db.from("personal_settings").select("*").eq("id","main").maybeSingle();
  if(error)return;
  if(data){
    $("siteTitleInput").value=data.site_title||"";
    $("siteSubtitleInput").value=data.site_subtitle||"";
    $("nowTextInput").value=data.now_text||"";
    $("aboutTextInput").value=data.about_text||"";
  }
}

$("saveSettingsBtn").addEventListener("click",async()=>{
  const payload={
    id:"main",
    site_title:$("siteTitleInput").value.trim(),
    site_subtitle:$("siteSubtitleInput").value.trim(),
    now_text:$("nowTextInput").value.trim(),
    about_text:$("aboutTextInput").value.trim(),
    updated_at:new Date().toISOString()
  };
  const {error}=await db.from("personal_settings").upsert(payload);
  msg("settingsMsg",error?error.message:"首页资料已保存。");
});

document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x===btn));
  $("postsTab").classList.toggle("hidden",btn.dataset.tab!=="posts");
  $("settingsTab").classList.toggle("hidden",btn.dataset.tab!=="settings");
}));

(async()=>{
  const {data}=await db.auth.getSession();
  if(data.session)await enter(data.session.user);
})();
