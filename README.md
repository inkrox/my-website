# BXR · 个人主页 ✨

> 14 岁九年级少年的个人网站 —— **五套风格，一键切换**：极光 / 赛博朋克 / 命令行 / 古风 / 星空。

🌐 访问地址：**[https://cralk.top](https://cralk.top)** · 备用：[https://inkrox.github.io/my-website](https://inkrox.github.io/my-website)

---

## 👋 关于我

<img src="me.jpg" width="132" alt="BXR 头像" style="border-radius:50%;" />

| | |
|---|---|
| 🧑 名字 | BXR |
| 📍 城市 | 哈尔滨市 |
| 🏫 学校 | 哈尔滨市第四十九中学校 |
| 📖 年级 | 九年级（初四）· 九班 · 学号 01 |
| 🧑‍💻 擅长 | Python · C++ · OIer（信息学竞赛） |
| 🎻 爱好 | 编程、小提琴 |

大家好，我是 BXR，一个 14 岁的阳光少年，生活在美丽的冰城哈尔滨。我热爱编程和小提琴，尤其擅长 Python 和 C++，是一名 OIer。我相信，只要坚持自己的梦想，并为之努力奋斗，就一定能够实现自己的目标 💪✨🌈

## 🎨 站点特色

- **五套风格皮肤**：极光（动态北极光幕布）· 赛博朋克（霓虹网格+扫描线+故障标题）· 命令行（开机自检打字机）· 古风（竖排题词·远山·圆形印章）· 星空（繁星+流星+玻璃拟态）—— 一键切换，自动记忆偏好，URL 支持 `?style=xxx` 直达
- **背景音乐**：每套皮肤专属 BGM，播放器支持进度条拖拽、音量调节
- **14 个小游戏**：代码雨、烟花、流星雨、时钟系列、QA 问答……访问前播放各风格专属加载动画
- **最近更新窗口**：页面左下角 📜 实时查看每次改版内容
- **实时数据**：不蒜子访客统计
- **移动端友好**：响应式布局，手机上同样流畅

## 🎮 小作品

| # | 作品 | 说明 |
|---|---|---|
| 🎯 | [射击游戏](https://shoot.cralk.top/) | shoot.cralk.top 在线小游戏（NEW） |
| 🌧️ | [代码雨](code-rain/index.html) | 黑客帝国经典字符雨 |
| 🧭 | [罗盘时钟](compass-clock/index.html) | 古风罗盘造型的时钟 |
| ⭕ | [光圈](aperture/index.html) | 光圈收缩动画特效 |
| ☄️ | [流星雨](meteor-shower/index.html) | 流星划过夜空的浪漫 |
| 🎆 | [烟花](firework/index.html) | 2D 粒子烟花绽放 |
| 🧨 | [3D 烟花](3d-firework/index.html) | 立体烟花秀 |
| 🖱️ | [可点击烟花](click-firework/index.html) | 点击任意位置绽放烟花 |
| ⏱️ | [粒子时钟](canvas-pixel-clock/index.html) | 粒子拼出实时时间 |
| 🕐 | [科技圆表](circle-clock/index.html) | 赛博风格的圆环表盘 |
| ⏲️ | [计时器](timer/index.html) | 简洁实用的倒计时 |
| 🚀 | [航天馆](space-museum/index.html) | 中国航天科普展馆 |
| 👨‍👧 | [父亲节](father-day/index.html) | 送给爸爸的节日贺卡 |
| ❓ | [QA 问答](qa/index.html) | 趣味知识问答小游戏 |
| 🔐 | [保密下载](download.html) | 密码解密下载文件 |

## 🔗 友链

- 🐙 [GitHub](https://github.com/inkrox)
- 📦 [本站源码](https://github.com/inkrox/my-website/)
- 📮 邮箱：inkrox@outlook.com · root@cralk.top
- 💬 [知乎](https://www.zhihu.com/people/9wbhos)
- 🚩 [洛谷](https://www.luogu.com.cn/user/1766805)

## 🛠️ 技术栈

- 纯 **HTML / CSS / JavaScript**，零框架零依赖；五套皮肤的 CSS/JS 按需懒加载（`skins/` 目录），首屏更轻
- **GitHub Pages** 托管，CNAME 绑定 cralk.top（cralk.top / sxws.pages.dev / inkrox.github.io/my-website 三域名同一站点）
- **不蒜子**（busuanzi.ibruce.info）访客统计

## 🚀 本地运行

直接双击 `index.html` 即可体验；或启动任意静态服务器：

```bash
python -m http.server 8080
# 然后访问 http://localhost:8080
```

> ⚠️ `download.html`（保密下载页）不能直接双击打开（file:// 下 WebCrypto 不可用），
> 必须通过 `http://localhost` 或 `https://` 访问。本地可用 `bxr-secure\server.js` 起服务器。

## 🏷️ 版本发布规范（git tag ↔ GitHub tag ↔ Release 三者一致）

每次发布新版本，三个东西必须同名同 commit：

1. **git tag**（本地，annotated tag）：
   ```bash
   git tag -a v2.2.4.260825 -m "v2.2.4.260825"
   ```
2. **GitHub tag**：推送 tag（或用网页创建 Release 时自动生成同名 tag）：
   ```bash
   git push origin v2.2.4.260825
   ```
   > 命令行凭据不可用时，直接在 GitHub 网页 `Releases → Draft a new release`，
   > 在 tag 输入框填 `v2.2.4.260825` 并勾选自动创建 —— GitHub 会在当前 main 上
   > 自动生成同名 tag，然后本地 `git fetch --tags` 拉回即可，三者完全一致。
3. **GitHub Release**：网页 Release 说明与 changelog.html 同版本条目内容保持一致。

版本号格式：`v主.次.修订.YYMMDD`，与 `changelog.html`、各页脚、UPDATES 数组同步更新。

## 📄 版权

- © BXR · Version v2.2.4.260825 · [更新日志](changelog.html)
- 背景音乐：Kevin MacLeod（[incompetech.com](https://incompetech.com)）· CC-BY 4.0
- [萌ICP备20243331号](https://icp.gov.moe/?keyword=20243331)
- 🧑‍💻 Made by BXR & [蓝色大肥鱼](https://www.deepseek.com) 🐟
