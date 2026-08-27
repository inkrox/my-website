# _tools/ — 站点自检脚本

改完代码后用 jsdom 验证「英文模式无中文残留」「终端翻译生效」「QA 双语正常」。
脚本内含绝对路径，可在任意位置运行，只需能 `require('jsdom')`。

## 使用

```powershell
# 第一次：在 _tools 里装 jsdom（node_modules 已被 .gitignore 排除，不会提交）
npm i jsdom

# 运行
node audit-cjk.js      # 主页英文模式扫描中文残留（剩 12 处均为刻意保留：ICP 备案号/诗意元素；UPDATES 历史记录白名单）
node audit-loaders.js  # 5 套加载页英文模式扫描（剩古风「少年行」「印」、星空「星野」为刻意保留）
node test-i18n.js      # 终端皮肤 i18n 选择器实测（about/作品/链接/访客行/页脚，17 个作品）
node test-features.js  # 新功能回归：作品卡片 17 个/双语、语录、搜索框、最高分标签、bxrRefresh
node test-2048.js      # 2048 冒烟：主题切换记忆、300 步移动后无重叠/越界/非法值
node check-qa-en.js    # QA 问答英文模式实测（题目/界面/选项是否英文）
```

## 规则速记（详见 MAINTENANCE.md）

1. 每次改动 → 版本号 `v主.次.修订.YYMMDD` 全站同步（5 套皮肤页脚 + 404 + loader + 终端开机 + 中英两版日志/README）
2. 中英文改动 → 查所有出现位置，改完跑 `audit-cjk.js` / `audit-loaders.js`
3. 英文措辞统一：本站源码 = Source Code（必须带 code）
4. 临时文件用完即删（测试环境、备份文件不要留在磁盘上）
