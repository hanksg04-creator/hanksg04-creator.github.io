# Personal Card Site

一个无需框架、无需构建工具的个人主页模板，适合直接部署到 GitHub Pages、Netlify 或 Vercel。

## 本地打开

直接双击 `index.html` 即可。如果浏览器对本地文件有限制，也可以在此目录运行：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 最常修改的地方

- `index.html`：姓名、简介、最近在做什么、展示内容、联系方式。
- `script.js`：`notes` 数组就是博客文章数据，复制一个对象即可新增文章。
- `style.css`：颜色、字号、圆角、布局。

## 部署建议

最简单：把整个文件夹上传到一个 GitHub 仓库，然后开启 GitHub Pages。

## 后续可以继续加入

- 独立文章页面和 Markdown 写作
- 搜索
- RSS
- GitHub 项目自动同步
- 实时市场数据卡片
- 评论 / 留言
- 自定义域名
- 后台内容管理
