let notes = [
  {
    id: 5,
    date: "2026.10.16",
    category: "life",
    categoryLabel: "随想",
    title: "Hello, world.",
    summary: "这是这个网站的第一条正式记录，也是一次发布测试。",
    body: [
      "Hello！这是我在这个个人网站上发布的第一条记录。",
      "我想把这里当成一个长期更新的个人空间：记录最近在做什么、工程项目、投资市场的想法，以及一些值得以后回看的东西。",
      "先从这一条开始。"
    ]
  },
  {
    id: 1,
    date: "2026.10",
    category: "investing",
    categoryLabel: "投资",
    title: "我为什么更在意长期框架，而不是下一次涨跌",
    summary: "市场每天都在给答案，但长期投资真正难的是先确定自己的问题。",
    body: [
      "我越来越觉得，投资里最重要的并不是预测明天会涨还是会跌，而是建立一个自己能长期执行的框架。一个策略如果只在顺风的时候让我舒服，那它可能不算真正的策略。",
      "我更愿意把注意力放在资产本身的质量、估值、分散程度和持有周期上。短期价格当然重要，但它更像是交易条件，而不是投资逻辑本身。",
      "这里记录的是个人学习与思考，不构成任何投资建议。"
    ]
  },
  {
    id: 2,
    date: "2026.10",
    category: "engineering",
    categoryLabel: "工程",
    title: "把一个系统调通，比把答案写出来难得多",
    summary: "工程项目真正有价值的部分，往往是那些不工作的时刻。",
    body: [
      "做硬件和代码项目的时候，我越来越能理解为什么工程和纯粹做题很不一样。题目通常默认条件成立，但真实系统不会。传感器会抖、接线会错、状态会卡住，代码也会和现实世界互相影响。",
      "所以调试过程本身就是一种能力：先缩小问题范围，再设计验证方法，然后用最少的改动排除一个又一个可能性。",
      "当一个系统终于稳定工作的时候，真正获得的往往不只是最终结果，而是一套以后还能复用的思考方式。"
    ]
  },
  {
    id: 3,
    date: "2026.09",
    category: "life",
    categoryLabel: "随想",
    title: "个人网站为什么比社交主页更有意思",
    summary: "算法决定别人看到什么，个人网站至少能决定自己留下什么。",
    body: [
      "社交平台很适合即时表达，但信息很快就会被新的内容淹没。个人网站更像一个自己整理过的档案，它不需要迎合推荐算法，也不需要为了频率而频率。",
      "我想把这里做成一个慢一点的地方。重要的想法留下，过时的内容修改，真正有价值的东西不断补充。",
      "它不是为了显得忙，而是为了让几年后的自己还能看见现在在想什么。"
    ]
  },
  {
    id: 4,
    date: "2026.09",
    category: "investing",
    categoryLabel: "投资",
    title: "复利最难的部分可能不是收益率",
    summary: "长期收益依赖时间，而时间要求你先避免把自己踢出局。",
    body: [
      "很多复利公式看起来很简单，但真正困难的是长期留在场上。高收益率当然很有吸引力，可如果策略伴随着过高波动、杠杆或情绪压力，执行本身就可能崩掉。",
      "所以我更关注一个组合能不能让我在多数市场环境下继续持有，而不是它在某一段时间里能不能跑到第一名。",
      "可持续性本身，也是一种收益来源。"
    ]
  }
];

const list = document.getElementById("notesList");
const dialog = document.getElementById("noteDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogMeta = document.getElementById("dialogMeta");
const dialogBody = document.getElementById("dialogBody");

function renderNotes(filter = "all") {
  const visible = filter === "all" ? notes : notes.filter(note => note.category === filter);
  list.innerHTML = visible.map(note => `
    <article class="note-item" tabindex="0" data-id="${note.id}" aria-label="阅读文章：${note.title}">
      <div class="note-date">${note.date}</div>
      <div>
        <h3 class="note-title">${note.title}</h3>
        <p class="note-summary">${note.summary}</p>
      </div>
      <div class="note-category">${note.categoryLabel}</div>
    </article>
  `).join("");
}

function openNote(id) {
  const note = notes.find(item => item.id === Number(id));
  if (!note) return;
  dialogMeta.textContent = `${note.categoryLabel.toUpperCase()} / ${note.date}`;
  dialogTitle.textContent = note.title;
  dialogBody.innerHTML = note.body.map(paragraph => `<p>${paragraph}</p>`).join("");
  dialog.showModal();
}

list.addEventListener("click", event => {
  const item = event.target.closest(".note-item");
  if (item) openNote(item.dataset.id);
});

list.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    const item = event.target.closest(".note-item");
    if (item) {
      event.preventDefault();
      openNote(item.dataset.id);
    }
  }
});

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
loadCmsContent();


async function loadCmsContent() {
  const cfg = window.SITE_CONFIG || {};
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey || cfg.supabaseUrl.includes("YOUR_") || !window.supabase) return;

  try {
    const client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);

    const [{ data: remotePosts, error: postsError }, { data: settings }] = await Promise.all([
      client.from("posts")
        .select("id,title,category,summary,body,published_at,created_at")
        .eq("published", true)
        .order("published_at", { ascending: false }),
      client.from("site_settings").select("*").eq("id", "main").maybeSingle()
    ]);

    if (!postsError && remotePosts && remotePosts.length) {
      notes = remotePosts.map(post => ({
        id: post.id,
        date: formatCmsDate(post.published_at || post.created_at),
        category: post.category || "life",
        categoryLabel: ({ investing: "投资", engineering: "工程", life: "随想" })[post.category] || "随想",
        title: post.title,
        summary: post.summary || "",
        body: String(post.body || "").split(/\n\s*\n/).filter(Boolean)
      }));
      renderNotes();
    }

    if (settings) applySiteSettings(settings);
  } catch (error) {
    console.warn("CMS unavailable; using local content.", error);
  }
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
