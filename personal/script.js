const cfg=window.SITE_CONFIG||{};
const reader=document.getElementById("reader");
const readerTitle=document.getElementById("readerTitle");
const readerMeta=document.getElementById("readerMeta");
const readerBody=document.getElementById("readerBody");
let posts=[];

const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const dateOf=v=>{
  if(!v)return"";
  const d=new Date(v);
  if(Number.isNaN(d.getTime()))return"";
  return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join(".");
};

function render(){
  const notes=posts.filter(p=>p.source!=="ai");
  const ai=posts.filter(p=>p.source==="ai");
  renderList("notesList",notes,"还没有记录。","NOTE");
  renderList("aiList",ai,"AI Daily 还没有开始记录。","AI");
}

function renderList(id,items,empty,label){
  const el=document.getElementById(id);
  if(!items.length){el.innerHTML=`<p class="empty">${empty}</p>`;return;}
  el.innerHTML=items.map(p=>`
    <article class="entry" tabindex="0" data-id="${p.id}">
      <div class="entry-date">${dateOf(p.published_at||p.created_at)}</div>
      <div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary||"")}</p>
      </div>
      <span class="entry-tag">${p.visibility==="private"?"PRIVATE · ":""}${label}</span>
    </article>`).join("");
}

function openPost(id){
  const p=posts.find(x=>String(x.id)===String(id));
  if(!p)return;
  readerMeta.textContent=`${p.visibility==="private"?"PRIVATE / ":""}${p.source==="ai"?"AI DAILY":"NOTE"} / ${dateOf(p.published_at||p.created_at)}`;
  readerTitle.textContent=p.title;
  readerBody.innerHTML=String(p.body||"").split(/\n\s*\n/).filter(Boolean).map(x=>`<p>${esc(x)}</p>`).join("");
  reader.showModal();
}

document.addEventListener("click",e=>{
  const item=e.target.closest(".entry");
  if(item)openPost(item.dataset.id);
});
document.addEventListener("keydown",e=>{
  if((e.key==="Enter"||e.key===" ")&&e.target.closest(".entry")){
    e.preventDefault();openPost(e.target.closest(".entry").dataset.id);
  }
});
document.getElementById("closeReader").addEventListener("click",()=>reader.close());
reader.addEventListener("click",e=>{
  const r=reader.getBoundingClientRect();
  if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)reader.close();
});

const stored=localStorage.getItem("personal-space-theme");
if(stored)document.documentElement.dataset.theme=stored;
document.getElementById("themeToggle").addEventListener("click",()=>{
  const next=document.documentElement.dataset.theme==="dark"?"light":"dark";
  document.documentElement.dataset.theme=next;
  localStorage.setItem("personal-space-theme",next);
});

async function load(){
  if(!cfg.supabaseUrl||!cfg.supabaseAnonKey||!window.supabase)return;
  const db=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);
  const [{data:p,error},{data:s}]=await Promise.all([
    db.from("personal_posts").select("*").eq("published",true).order("published_at",{ascending:false}),
    db.from("personal_settings").select("*").eq("id","main").maybeSingle()
  ]);
  if(!error&&p){posts=p;render();}
  if(s){
    if(s.site_title){document.getElementById("siteTitle").textContent=s.site_title;document.title=s.site_title;}
    if(s.site_subtitle)document.getElementById("siteSubtitle").textContent=s.site_subtitle;
    if(s.now_text)document.getElementById("nowText").textContent=s.now_text;
    if(s.about_text)document.getElementById("aboutText").textContent=s.about_text;
  }
}
render();
load();
