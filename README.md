# ✈️ YatraBoyz — Travel Planner

A production-grade React capstone project for planning trips across India.

## 🚀 Features

- **Home** — Hero, stats, featured destinations
- **Explore** — Search + category filter + sort across 12 destinations
- **Planner** — Full CRUD trips (Create, Read, Update, Delete) with localStorage persistence
- **Budget Calculator** — Smart hotel/food/transport cost estimator
- **Dashboard** — Pie & Bar charts, stats widgets, trips summary table
- **Dark Mode** — Toggle with localStorage persistence

## 📦 Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## 🛠 Tech Stack

- React 18 + Vite
- React Router v6
- Chart.js + react-chartjs-2
- Context API + localStorage
- Pure CSS (no Tailwind needed)

## 📁 Structure

```
src/
  components/
    Navbar.jsx / Navbar.css
  pages/
    Home.jsx / Home.css
    Explore.jsx / Explore.css
    Planner.jsx / Planner.css
    Dashboard.jsx / Dashboard.css
  context/
    TripContext.jsx
  App.jsx
  main.jsx
  index.css
```

## 🎨 Brand

- Primary: #1D9E75 (forest green)
- Accent: #F59E0B (amber)
- Fonts: Playfair Display (headings) + DM Sans (body)

## ✅ Capstone Coverage

| Requirement | Status |
|---|---|
| React UI | ✅ |
| Routing (4 pages) | ✅ |
| CRUD Operations | ✅ |
| State Management | ✅ Context API |
| Charts Dashboard | ✅ Pie + Bar |
| Search + Filter | ✅ |
| localStorage Persistence | ✅ |
| Dark Mode | ✅ |
| Error Handling / Validation | ✅ |
| Smart Budget Calculator | ✅ Unique feature |
