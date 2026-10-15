# Steven Gao Website — 使用说明

这份文档用于说明目前网站的整体结构、日常使用方式、管理员后台、AI Daily、Supabase 数据库，以及哪些内容需要通过 GitHub 修改。

---

## 1. 网站结构

目前一共有两个网站：

### Public Site

地址：

`https://hanksg04-creator.github.io/`

定位：

- 对外公开主页
- 可以分享给家人、朋友、同学或其他人
- 主要展示：
  - 最近在做什么
  - 最近的想法
  - 课程与硬件项目
  - 投资观察
  - 个人档案
  - About
  - 联系方式

Public Site 更适合放经过筛选、愿意公开展示的内容。

---

### Personal Site

地址：

`https://hanksg04-creator.github.io/personal/`

定位：

- 更偏个人记录、随想和思想档案
- 公开可访问，但刻意降低搜索引擎可发现性
- 主要包含：
  - Now
  - 我的记录
  - AI Daily
  - About

Personal Site 已设置：

- `noindex`
- `nofollow`
- `robots.txt` 中禁止搜索引擎抓取 `/personal/`

注意：

这只是“低可发现性”，不是密码保护。

只要别人知道网址，仍然可以访问 Personal Site。

因此，不要在 Personal Site 发布真正敏感的信息，例如：

- 密码
- 身份证件
- 银行信息
- 私人账号凭证
- 真实敏感健康信息
- 不希望任何其他人看到的私人内容

---

## 2. 管理员后台

### Public Site Admin

地址：

`https://hanksg04-creator.github.io/admin/`

用途：

- 新建 Public Site 文章
- 编辑文章
- 删除文章
- 保存草稿
- 修改部分首页资料

登录账号：

使用 Supabase Authentication 中创建的管理员账号。

---

### Personal Site Admin

地址：

`https://hanksg04-creator.github.io/personal/admin/`

用途：

- 新建 Personal Site 随想
- 编辑 / 删除 Personal Site 记录
- 手动创建 AI Daily
- 保存草稿
- 修改 Personal Site 首页资料

Personal Site 和 Public Site 使用同一个管理员账号。

---

## 3. 内容分别保存在哪里

网站代码和网站内容是分开的。

### GitHub

GitHub 负责：

- HTML
- CSS
- JavaScript
- 页面布局
- 网站样式
- Admin 页面代码

仓库：

`hanksg04-creator/hanksg04-creator.github.io`

---

### Supabase

Supabase 负责：

- 管理员登录
- 文章数据库
- 首页文本
- 权限控制
- RLS

当前 Supabase 项目：

`steven-gao-site`

区域：

Singapore

---

## 4. 数据表结构

### Public Site

文章：

`posts`

首页资料：

`site_settings`

---

### Personal Site

文章：

`personal_posts`

首页资料：

`personal_settings`

---

### 管理员

管理员名单：

`site_admins`

只有存在于 `site_admins` 中的 Supabase 用户才允许修改内容。

---

## 5. 日常发布文章

### 在 Public Site 发文章

打开：

`/admin/`

登录后：

1. 点击「文章」
2. 点击「+ 新建」
3. 填写标题
4. 选择分类
5. 填写摘要
6. 填写正文
7. 选择「已发布」或「草稿」
8. 点击保存

发布后 Public Site 会自动读取 Supabase 数据。

不需要修改 GitHub。

---

### 在 Personal Site 发随想

打开：

`/personal/admin/`

然后：

1. 点击「+ 新建」
2. 填写标题
3. 填写摘要
4. 填写正文
5. 类型选择「我的记录」
6. 点击保存

内容会出现在：

Personal Site → 我的记录

---

## 6. AI Daily

AI Daily 是自动生成的每日 AI 总结。

当前规则：

- 只发布到 Personal Site
- 不允许发布到 Public Site
- 数据写入：
  `personal_posts`
- `source = ai`
- 正文结尾固定：
  `— AI 发布`

AI Daily 的内容重点是：

- 当天讨论过的主题
- 当天学习内容
- 当天的观点与思考
- AI 视角下的综合总结

它不是聊天记录，也不是“今天用了多少 AI”的日志。

---

### AI Daily 隐私规则

AI Daily 可以提到：

- ENG1011
- ENG1013
- ENG1014
- 编程
- 工程项目
- 学习过程
- 一般性的思想、观点和公开话题

默认不发布：

- 密码
- 邮箱内容
- 精确位置
- 私人联系方式
- 账号 ID
- 金融账户余额
- 具体持仓隐私
- 敏感健康信息
- 家庭隐私
- 私人文件
- 其他容易识别或暴露个人隐私的信息

---

## 7. 哪些内容可以直接在 Admin 修改

目前可以直接通过 Admin 管理：

### Public Site

- 文章
- 草稿
- 首页标题
- 首页介绍
- Current Focus
- About
- 部分首页文本

### Personal Site

- 我的记录
- AI Daily
- 首页标题
- 副标题
- Now
- About

---

## 8. 哪些内容目前仍需要改 GitHub

以下内容属于“网站程序和设计”，目前需要修改 GitHub：

- 页面结构
- Section 顺序
- 卡片数量
- 导航菜单
- CSS 样式
- 手机适配
- 深色模式
- 新功能
- 项目展示区结构
- 联系方式链接
- 新增新的页面类型

原则：

> 内容更新 → Admin

> 网站设计 / 功能更新 → GitHub

---

## 9. Public Site 与 Personal Site 的定位

### Public Site

可以理解为：

> 我愿意主动展示给别人看的版本。

适合：

- 阶段性总结
- 精选文章
- 项目
- 公开观点
- About
- 联系方式

---

### Personal Site

可以理解为：

> 一个公开可访问，但主要写给未来自己的思想档案。

适合：

- 随想
- 临时观点
- 学习片段
- AI Daily
- 还没有完全成熟的想法
- 日常记录

---

## 10. 安全机制

当前网站使用：

### GitHub Pages

负责静态页面托管。

---

### Supabase Auth

负责管理员登录。

---

### Supabase RLS

负责控制数据库权限。

当前规则大致为：

- 普通访客：
  - 可以读取已发布内容
  - 不能新增
  - 不能修改
  - 不能删除

- 管理员：
  - 登录成功
  - 并且存在于 `site_admins`
  - 才可以修改内容

---

## 11. API Key

前端使用的是：

`sb_publishable_...`

这是 Supabase 的 Publishable Key。

它本来就是允许放在浏览器和公开网页中的。

不要把以下类型的 key 放入 GitHub：

- `service_role`
- `sb_secret_...`

它们拥有高权限，不能暴露。

---

## 12. 如果网站出现异常

### 页面没有更新

尝试：

- 强制刷新
- Android / Windows Chrome：
  Ctrl + Shift + R
- Mac Chrome：
  Cmd + Shift + R

GitHub Pages 有时需要几十秒到几分钟部署。

---

### Admin 登录失败

检查：

- 邮箱是否正确
- 密码是否正确
- Supabase 用户是否存在
- 账号是否被加入 `site_admins`

---

### 文章不显示

检查：

- 是否设置为「已发布」
- Public Site 是否写入 `posts`
- Personal Site 是否写入 `personal_posts`

---

## 13. 搜索引擎与访问权限

### Public Site

正常公开。

可以被搜索引擎发现。

---

### Personal Site

公开可访问，但设置了：

`noindex`

并通过：

`robots.txt`

降低搜索引擎收录概率。

但这不是安全访问控制。

知道 URL 的人仍然可以访问。

---

## 14. 推荐的长期维护方式

尽量遵守以下原则：

1. 日常写文章只用 Admin
2. 不为了发文章直接修改 GitHub
3. GitHub 只负责网站程序
4. Supabase 只负责网站内容和权限
5. 敏感信息永远不要放进公开网站
6. Public Site 放精选内容
7. Personal Site 放更自由的记录
8. AI Daily 只进入 Personal Site

---

## 15. 当前网站地址汇总

Public Site：

`https://hanksg04-creator.github.io/`

Public Admin：

`https://hanksg04-creator.github.io/admin/`

Personal Site：

`https://hanksg04-creator.github.io/personal/`

Personal Admin：

`https://hanksg04-creator.github.io/personal/admin/`

GitHub Repository：

`https://github.com/hanksg04-creator/hanksg04-creator.github.io`

---

## 16. 整体架构

```text
GitHub Repository
│
├── Public Site
│   ├── /
│   └── /admin/
│
├── Personal Site
│   ├── /personal/
│   └── /personal/admin/
│
└── config.js
        │
        ↓
     Supabase
        │
        ├── Authentication
        ├── site_admins
        ├── posts
        ├── site_settings
        ├── personal_posts
        └── personal_settings
```

---

## 17. 最核心的使用原则

这个系统的设计目标是：

> 平时写东西，不需要打开 GitHub。

你只需要打开对应的 Admin 页面。

只有在想修改：

- 网站结构
- 页面设计
- 新功能
- CSS
- 导航
- 新 Section

时，才需要修改 GitHub。

---

_Last updated: 2026-10-16_
