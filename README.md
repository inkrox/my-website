# BXR · 个人主页

我是 BXR，来自哈尔滨，一名九年级（初四）学生。这个网站是我的个人主页，从 2025 年初开始自己维护，页面全部使用 HTML / CSS / JavaScript 编写，没有依赖任何框架。

主站地址：**https://cralk.top**（备用：https://inkrox.github.io/my-website）

English version: [README.en.md](README.en.md)

## 站点内容

主页提供五套皮肤，可在页面中直接切换：极光、赛博朋克、命令行、古风、星空。选择结果会被记住，下次访问时自动恢复，也可以通过 `?style=xxx` 参数直接指定。每套皮肤配有独立的背景音乐和加载动画。

小作品列表：

- 射击游戏（shoot.cralk.top）
- 代码雨、烟花、3D 烟花、可点击烟花、流星雨
- 罗盘时钟、粒子时钟、科技圆表、计时器
- 光圈、航天馆、父亲节贺卡、QA 问答
- 保密下载（需密码，不对外提供）

## 联系方式

- GitHub：https://github.com/inkrox（源码仓库：inkrox/my-website）
- 邮箱：inkrox@outlook.com、root@cralk.top

## 本地运行

直接双击 `index.html` 即可浏览，也可以启动本地服务器：

```bash
python -m http.server 8080
```

然后访问 http://localhost:8080。

注意：`download.html`（保密下载页）依赖 WebCrypto，在 file:// 协议下无法运行，必须通过 http:// 或 https:// 访问。本地测试可运行 `bxr-secure\server.js`。

## 版本

当前版本 **v2.2.16.260826**，格式为 `v主.次.修订.日期`，每次改动递增。

发布时需保证 git tag、GitHub tag 与 Release 三者名称一致：

```bash
git tag -a v2.2.16.260826 -m "v2.2.16.260826"
git push origin v2.2.16.260826
```

也可以在 GitHub 网页端创建 Release 时直接填写同名 tag。

## 版权

© BXR · v2.2.16.260826 · 更新记录见 [changelog.html](changelog.html)
背景音乐：Kevin MacLeod（[incompetech.com](https://incompetech.com)）· CC-BY 4.0
[萌ICP备20243331号](https://icp.gov.moe/?keyword=20243331)
Made by BXR & 蓝色大肥鱼 🐟
