let notes = [];
let aiDaily = [];

const list = document.getElementById("notesList");
const aiList = document.getElementById("aiDailyList");
const dialog = document.getElementById("noteDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogMeta = document.getElementById("dialogMeta");
const dialogBody = document.getElementById("dialogBody");

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = String(value ?? "");
  return div.innerHTML;
}

function renderEntries(target, entries, emptyText) {
  if (!entries.length) {
    target.innerHTML = `<div class="empty-state">${escapeHtml(emptyText)}</div>`;
    return;
  }

  target.innerHTML = entries.map(note => `
    <article class="note-item" tabindex="0" data-id="${note.id}" data-source="${note.source}" aria-label="阅读文章：${escapeHtml(note.title)}">
      <div class="note-date">${escapeHtml(note.date)}</div>
      <div>
        <h3 class="note-title">${escapeHtml(note.title)}</h3>
        <p class="note-summary">${escapeHtml(note.summary)}</p>
      </div>
      <div class="note-category">${escapeHtml(note.source === "ai" ? "AI" : note.categoryLabel)}</div>
    </article>
  `).join("");
}

function renderNotes(filter = "all") {
  const visible = filter === "all" ? notes : notes.filter(note => note.category === filter);
  renderEntries(list, visible, "还没有发布个人记录。");
}

function renderAiDaily() {
  renderEntries(aiList, aiDaily, "AI Daily 会在当天有实质交流时自动出现在这里。");
}

function getEntry(id, source) {
  const collection = source === "ai" ? aiDaily : notes;
  return collection.find(item => item.id === Number(id));
}

function openNote(id, source = "user") {
  const note = getEntry(id, source);
  if (!note) return;
  dialogMeta.textContent = `${note.source === "ai" ? "AI DAILY" : note.categoryLabel.toUpperCase()} / ${note.date}`;
  dialogTitle.textContent = note.title;
  dialogBody.innerHTML = note.body.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("");
  dialog.showModal();
}

function bindList(target) {
  target.addEventListener("click", event => {
    const item = event.target.closest(".note-item");
    if (item) openNote(item.dataset.id, item.dataset.source);
  });

  target.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      const item = event.target.closest(".note-item");
      if (item) {
        event.preventDefault();
        openNote(item.dataset.id, item.dataset.source);
      }
    }
  });
}

bindList(list);
bindList(aiList);

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderNotes(button.dataset.filter);
  });
});

document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  const rect = dialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) dialog.close();
});

const themeToggle = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("personal-site-theme");
if (storedTheme) document.documentElement.dataset.theme = storedTheme;

function updateThemeIcon() {
  document.getElementById("themeIcon").textContent = document.documentElement.dataset.theme === "dark" ? "☀" : "◐";
}

updateThemeIcon();
themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("personal-site-theme", next);
  updateThemeIcon();
});

document.addEventListener("pointermove", event => {
  document.body.style.setProperty("--mouse-x", `${event.clientX}px`);
  document.body.style.setProperty("--mouse-y", `${event.clientY}px`);
});

document.getElementById("year").textContent = new Date().getFullYear();
renderNotes();
renderAiDaily();
loadCmsContent();

async function loadCmsContent() {
  const cfg = window.SITE_CONFIG || {};
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey || cfg.supabaseUrl.includes("YOUR_") || !window.supabase) return;

  try {
    const client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);

    const [{ data: remotePosts, error: postsError }, { data: settings }] = await Promise.all([
      client.from("posts")
        .select("id,title,category,summary,body,source,published_at,created_at")
        .eq("published", true)
        .order("published_at", { ascending: false }),
      client.from("site_settings").select("*").eq("id", "main").maybeSingle()
    ]);

    if (!postsError && remotePosts) {
      const mapped = remotePosts.map(mapCmsPost);
      notes = mapped.filter(post => post.source !== "ai");
      aiDaily = mapped.filter(post => post.source === "ai");
      renderNotes(document.querySelector(".filter.active")?.dataset.filter || "all");
      renderAiDaily();
    }

    if (settings) applySiteSettings(settings);
  } catch (error) {
    console.warn("CMS unavailable.", error);
  }
}

function mapCmsPost(post) {
  const source = post.source === "ai" ? "ai" : "user";
  return {
    id: post.id,
    source,
    date: formatCmsDate(post.published_at || post.created_at),
    category: post.category || "life",
    categoryLabel: ({ investing: "投资", engineering: "工程", life: "随想" })[post.category] || "随想",
    title: post.title || "",
    summary: post.summary || "",
    body: String(post.body || "").split(/\n\s*\n/).filter(Boolean)
  };
}

function formatCmsDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join(".");
}

function applySiteSettings(s) {
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  };

  setText("brandName", s.display_name);
  setText("footerName", s.display_name);
  setText("locationText", s.location_text);
  setText("focusTitle", s.focus_title);
  setText("focusBody", s.focus_body);
  setText("aboutBody", s.about_body);

  const heroTitle = document.getElementById("heroTitle");
  if (heroTitle && s.hero_title) heroTitle.textContent = s.hero_title;

  const heroCopy = document.getElementById("heroCopy");
  if (heroCopy && s.hero_copy) heroCopy.textContent = s.hero_copy;

  if (s.display_name) document.title = `${s.display_name} — Personal Space`;
}
