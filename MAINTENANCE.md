# 维护说明（仅站主）

> 本文件是给 BXR 自己的改站备忘，访客请看 [README.md](README.md)。

## 主页结构

- **主页只有 1 个**：`index.html`（改内容只改对应皮肤容器的 HTML）
- **皮肤架构**：5 套皮肤各自独立布局（极光卡片式 / 赛博剪裁面板 / 终端窗口 / 古风竖排 / 星空玻璃），CSS 全部以 `html.skin-X .skin-view[data-skin="X"]` 作用域隔离，互相不干扰
- **皮肤 CSS/JS 已拆分**：`skins/skin-风格.css` + `skins/skin-风格.js`（按皮肤懒加载，改皮肤样式/动画改对应文件；改完确认 index.html 里的 `ensureSkinAssets` 路径一致）`n- 皮肤相关 JS 配置（BGM/歌曲名/特效配色/标题）在页面底部脚本的 `*_BY_SKIN` 映射表（含 `TITLE_BY_SKIN`）`n- 快捷键：←/→ 切换皮肤；双击页面有各风格特效

## 维护约定

- 小游戏入口统一走加载页：**按皮肤风格**——极光用 `loader.html?to=路径`，其余皮肤用 `templates/loader-风格.html?to=../路径`（如赛博朋克皮肤 → `loader-cyberpunk.html`）
- 背景音乐按风格存放：根目录 `bgm.mp3`（默认），`templates/bgm-*.mp3`（各风格）
- 访客统计：不蒜子（busuanzi.ibruce.info），页脚显示 UV/PV；9 秒无响应自动切本地计数兜底
- **版本号格式**：`v主.次.修订.YYMMDD`（例：`v2.2.3.260824`），主页页脚 + 404 + 终端开机页 + loader 统一同步
- **页面特效**：鼠标拖尾（✦ 星光）+ 点击绽放特效（随皮肤换配色）；卡片随滚动逐张浮现；终端命令随滚动敲出
- **风格记忆**：localStorage 记住访客选择的风格，支持 `?style=cyberpunk` 等参数直达
- **最近更新窗口**：页面左下角 📜，改版后在脚本的 `UPDATES` 数组加一条（含改动文件），并同步 changelog.html
- **更新日志**：changelog.html，页脚有入口

## 新增/删除小游戏

1. 改 `index.html` 里 **5 个皮肤容器**的作品列表（各皮肤卡片/列表格式不同）
2. 顺带更新 README.md 的作品表、sitemap.xml
3. 提交时确认新文件夹被包含
