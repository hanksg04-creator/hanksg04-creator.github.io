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


---

## 18. 使用建议：两个网站应该怎么分工

技术上两个网站都可以放很多东西，但为了让它们长期保持清晰，建议一直维持下面的分工。

### Public Site：对外展示，但不要做成“包装自己”

Public Site 最适合放：

- 阶段性总结
- 比较成熟的观点
- 值得保留的课程项目
- 工程项目
- 学习成果
- 投资与市场观察
- About
- 联系方式
- 少量精选 Notes

一个简单判断标准是：

> 如果一个第一次认识我的人看到这段内容，我是否愿意？

如果答案是愿意，就可以考虑放 Public Site。

Public Site 不需要更新得非常频繁。

一个月一篇、几个月一次都完全没有问题。

它更像：

> 我选择主动展示给外界的版本。

而不是：

> 我每天发生了什么。

---

### Personal Site：首先写给未来的自己

Personal Site 更适合：

- 突然冒出来的想法
- 还没有完全成熟的观点
- 学习中的片段
- 某件事带来的感受
- 最近在关注什么
- AI Daily
- 一些以后可能会推翻的判断
- 日常碎碎念

这里没有必要要求每一篇都“有价值”。

Personal Site 的判断标准更适合是：

> 半年以后，我会不会想看看现在的自己在想什么？

而不是：

> 别人会不会觉得这篇写得好？

这可以避免 Personal Site 慢慢变成另一个“个人品牌主页”。

---

## 19. 一个很重要的原则：不要因为“可能有人看”而停止写

Personal Site 虽然公开可访问，但它的核心用途仍然是记录自己。

如果以后发现：

> 因为知道家人、朋友可能会看，所以开始下意识过滤所有想法。

那么这个网站的价值就会下降。

更好的做法不是完全停止记录，而是做内容分层：

- 愿意公开 → Public Site
- 愿意被少数人看到 → Personal Site
- 真正不希望别人看到 → 不放在这两个网站

不要把所有内容都强行塞进同一个隐私等级。

---

## 20. 分享给家人和朋友时的建议

### Public Site

可以正常分享。

适合分享给：

- 家人
- 同学
- 朋友
- 老师
- 以后认识的人

因为 Public Site 本身就是一个经过筛选的公开主页。

---

### Personal Site

不要主动大规模传播。

更适合：

- 自己访问
- 分享给少数真正想分享的人
- 偶尔让朋友看看
- 当成长期个人档案

如果只是希望：

> 我在任何设备上都能访问，同时别人不太容易偶然发现。

现在的“公开 + noindex + robots.txt”已经比较合适。

但要记住：

> 低可发现性 ≠ 私密。

---

## 21. 写文章时的建议

### 不需要每篇都写成长文

可以只有：

- 一句话
- 一段话
- 一个判断
- 一个问题
- 一次复盘
- 一个以后值得回来看的想法

Personal Site 尤其不需要追求完整文章结构。

---

### Public Site 的文章尽量经过一次筛选

发布前可以问自己三个问题：

1. 这是不是我真的想表达的？
2. 半年后我还愿意让别人看到吗？
3. 有没有不必要的个人隐私？

如果都没有问题，就可以发。

---

### 不要为了“显得有内容”而更新

这个网站不是社交媒体。

不需要：

- 每天更新
- 保持活跃度
- 追求点赞
- 追求流量
- 为算法写东西

没有内容时不更新，是正常状态。

---

## 22. “最近在干嘛”区域应该怎么用

Public Site 的 Now 区域适合回答：

> 最近一两个月，我真正花时间在什么事情上？

推荐放：

- 当前课程
- 当前项目
- 最近研究的问题
- 最近长期思考的问题

不推荐放：

- 每天具体做了什么
- 很快就会过期的小事
- 过多琐碎行程

Now 的内容可以每几周或每个月更新一次。

---

## 23. “我想展示的东西”应该怎么用

这个区域不一定是传统意义上的作品集。

它可以放：

- 工程项目
- 课程项目
- 数据分析
- 阅读记录
- 旅行整理
- 市场研究
- 长期兴趣
- 值得保留的个人档案

但推荐只放：

> 真正代表某个阶段的东西。

如果一个内容只是临时完成的小作业，没有长期保留价值，不一定需要放进去。

---

## 24. 三张 Current Cards 怎么理解

Public Site 目前有类似：

- RULE I KEEP
- CURRENT QUESTION
- CURRENT INTEREST

它们的作用不是展示“成绩”，而是展示：

> 你怎么思考。

推荐保持这个逻辑：

### RULE I KEEP

一个长期原则。

例如：

> 把复杂问题写简单。

---

### CURRENT QUESTION

一个最近长期在思考的问题。

例如：

> 什么值得长期持有？

---

### CURRENT INTEREST

一个最近正在研究的主题。

例如：

> 最近在研究薄肌理论。

这里不一定需要解释得非常详细。

有时候只保留标题，反而更像真实的个人主页。

---

## 25. AI Daily 的使用建议

AI Daily 不应该写成：

> 今天用了 ChatGPT 做了 A、B、C。

它更适合写成：

> AI 从今天的交流中观察到，我主要在思考哪些问题。

因此 AI Daily 应重点总结：

- 当天最主要的主题
- 新形成的观点
- 学习上的变化
- 思考方式的变化
- 值得以后回看的问题

AI Daily 更像：

> 一篇由 AI 写的每日思想旁观记录。

不是：

> AI 使用日志。

---

### AI Daily 不需要每天强行发布

如果当天没有什么实质交流，可以不发。

保持：

> 有内容才记录。

比每天为了连续性写一篇更有价值。

---

## 26. 什么内容永远不要放进网站

无论 Public Site 还是 Personal Site，都不建议放：

- 密码
- API Secret
- service_role key
- 银行账号
- 身份证件
- 护照资料
- 登录验证码
- 私人聊天全文
- 详细金融账户余额
- 不希望其他人知道的健康信息
- 私人家庭冲突细节
- 其他一旦公开会造成实际损失的信息

如果内容属于：

> “被陌生人看到会让我真正后悔。”

那就不要放在这两个网站。

---

## 27. Admin 与 GitHub 应该分别在什么时候使用

### 用 Admin 的情况

只要是“内容变化”，优先使用 Admin：

- 发文章
- 修改文章
- 删除文章
- 写随想
- 修改 Now
- 修改 About
- 修改首页文字

---

### 用 GitHub / 找 AI 修改的情况

如果是“网站本身发生变化”，才需要修改 GitHub：

- 新增 Section
- 修改排版
- 调整字体
- 修改导航
- 加动画
- 增加新的数据类型
- 新增页面
- 修改 Admin 功能
- 改手机适配

一个非常简单的判断方式：

> 内容变了 → Admin

> 网站功能或样子变了 → GitHub

---

## 28. 推荐的长期维护节奏

不需要制定严格计划，可以保持非常轻的节奏。

### 随时

Personal Site：

- 有想法就记
- 没有就不记

---

### 每几周

Public Site：

- 更新一次 Now
- 看看有没有值得整理成正式文章的内容

---

### 每几个月

回顾一次：

- Public Site 有没有过时内容
- Personal Site 有没有值得整理成 Public Article 的内容
- Projects 是否需要更新
- About 是否还符合当前状态

Personal Site 可以作为 Public Site 的“素材库”。

很多公开文章，可以先从 Personal Site 的碎片慢慢长出来。

---

## 29. 网站长期最重要的不是功能，而是可持续使用

不要为了增加功能而不断增加功能。

这个网站真正有价值的部分是：

- 你愿意持续使用
- 写东西没有心理负担
- 半年后还能找到以前的想法
- 几年后能看到自己的变化

如果一个新功能让写东西变得更麻烦，就不一定值得加入。

---

## 30. 一句话理解目前的两个网站

Public Site：

> 我愿意主动展示给别人看的自己。

Personal Site：

> 我愿意留给未来自己看的自己。

Private Notes：

> 我暂时不希望任何其他人看到的自己。

三者不需要互相替代。

最舒服的状态是让它们各自承担不同的内容。
