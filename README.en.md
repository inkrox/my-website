# BXR · Personal Homepage

I'm BXR, a Grade 9 student from Harbin. This is my personal homepage, which I've been maintaining myself since early 2025. Everything is built with plain HTML / CSS / JavaScript — no frameworks.

Main site: **https://cralk.top** (mirror: https://inkrox.github.io/my-website)

Chinese version: [README.md](README.md)

## About the site

The homepage offers five skins, switchable right on the page: Aurora, Cyberpunk, Terminal, Classical and Starry. Your choice is remembered and restored on your next visit; you can also pick a skin directly with a `?style=xxx` parameter. Each skin has its own background music and loading animation.

Small projects:

- Shooting game (shoot.cralk.top)
- Code Rain, Fireworks, 3D Fireworks, Click Fireworks, Meteor Shower
- Compass Clock, Pixel Clock, Tech Watch, Timer
- Aperture, Space Museum, Father's Day Card, QA Quiz
- 2048, Snake (five themes + local best scores)
- Secret Downloads (password required, not shared publicly)

## Contact

- GitHub: https://github.com/inkrox (source repo: inkrox/my-website)
- Email: inkrox@outlook.com, root@cralk.top

## Running locally

Just double-click `index.html`, or start a local server:

```bash
python -m http.server 8080
```

Then visit http://localhost:8080.

Note: `download.html` (the secret download page) relies on WebCrypto and won't work under the `file://` protocol — it must be served over http:// or https://. For local testing you can run `bxr-secure\server.js`.

## Versioning

Current version: **v2.2.24.260826**. Format: `vMAJOR.MINOR.PATCH.YYMMDD`, incremented on every change.

When releasing, the git tag, GitHub tag and Release must share the same name:

```bash
git tag -a v2.2.24.260826 -m "v2.2.24.260826"
git push origin v2.2.24.260826
```

Alternatively, create the Release on GitHub's web UI and fill in the same tag name.

## License

© BXR · v2.2.24.260826 · Changelog: [changelog-en.html](changelog-en.html)
Background music: Kevin MacLeod ([incompetech.com](https://incompetech.com)) · CC-BY 4.0
[萌ICP备20243331号](https://icp.gov.moe/?keyword=20243331)
Made by BXR & Blue Fat Fish 🐟
