# 🚀 Deploy Guide — Cyberpunk Portfolio

Trang portfolio cyberpunk cá nhân, deploy lên GitHub Pages.

---

## 📦 Cài đặt & Chạy Local

```bash
# Cài dependencies
npm install

# Dev server (http://localhost:5173)
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

---

## 🌐 Deploy lên GitHub Pages

### Cách 1: GitHub Actions (Tự động)

1. Push code lên GitHub repo
2. Vào repo **Settings → Pages**
3. Source chọn **GitHub Actions**
4. Push lên `main` branch → tự động deploy

### Cách 2: Manual deploy với `gh-pages`

```bash
# Cập nhật vite.config.js — sửa base path:
# base: '/<ten-repo-cua-ban>/'

# Build + Deploy
npm run build
npx gh-pages -d dist
```

Sau đó vào **Settings → Pages** → Source: `gh-pages` branch.

---

## 📝 Cập nhật CVE/Bugs

**Chỉ cần sửa DUY NHẤT file** `src/data/findings.md`.

### Format:

```markdown
CVE-2026-XXXX
Title: Tiêu đề vulnerability
Impact: High | Medium | Low
Company: Tên công ty
Description: Mô tả chi tiết
Date: YYYY-MM-DD
```

Mỗi entry cách nhau bởi `---` (3 dấu gạch ngang).

**KHÔNG cần sửa bất kỳ file React nào.** Trang web tự động load và parse từ Markdown.

---

## 🎨 Tùy chỉnh

- **Màu sắc**: Sửa CSS variables trong `src/index.css`
- **Dữ liệu companies**: Sửa mảng `COMPANIES` trong `src/pages/Companies.jsx`
- **Skills**: Sửa mảng `SKILLS` trong `src/pages/Home.jsx`
- **Tên/alias**: Sửa trong `src/pages/Home.jsx`

---

## 🏗️ Project Structure

```
cyberpunk-portfolio/
├── .github/workflows/deploy.yml   # GitHub Actions auto-deploy
├── public/
│   └── vite.svg                   # Favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx/.css        # Tab navigation
│   │   ├── MatrixRain.jsx         # Matrix background effect
│   │   ├── GlitchText.jsx/.css    # Glitch text animation
│   │   ├── TypeWriter.jsx         # Terminal typing effect
│   │   ├── CVECard.jsx/.css       # CVE/Bug card component
│   │   └── CompanyCard.jsx/.css   # Company timeline card
│   ├── pages/
│   │   ├── Home.jsx/.css          # Home/About tab
│   │   ├── Companies.jsx/.css     # Companies tab
│   │   └── CVEBugs.jsx/.css       # CVE/Bugs tab (data-driven)
│   ├── utils/
│   │   └── markdownParser.js      # Markdown parsing logic
│   ├── data/
│   │   └── findings.md            # CVE/Bug data (EDIT THIS FILE ONLY)
│   ├── App.jsx                    # Tab system + layout
│   ├── App.css
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global cyberpunk theme
├── index.html
├── vite.config.js
├── package.json
└── DEPLOY.md                      # This file
```

---

## 🔧 Tech Stack

| Layer      | Tech                  |
| ---------- | --------------------- |
| Framework  | React 18              |
| Build      | Vite 5                |
| Styling    | CSS (custom properties + animations) |
| Fonts      | Orbitron, Share Tech Mono, Rajdhani (Google Fonts) |
| Deploy     | GitHub Pages + Actions |
