# Project structure (tree)

> Frontend is a Vite + React app.
> Backend is currently scaffolding/placeholder (no files found yet).

```text
Project/
├─ Frontend/
│  ├─ index.html
│  ├─ package.json
│  ├─ vite.config.js
│  ├─ package-lock.json
│  ├─ src/
│  │  ├─ main.jsx
│  │  ├─ app/
│  │  │  ├─ layout.jsx
│  │  │  ├─ App.jsx
│  │  │  └─ dashboard/
│  │  │     └─ Dashboard.jsx
│  │  ├─ components/
│  │  │  ├─ common/
│  │  │  │  ├─ Card.jsx
│  │  │  │  ├─ Header.jsx
│  │  │  │  ├─ Navbar.jsx
│  │  │  │  └─ Sidebar.jsx
│  │  │  └─ dashboard/
│  │  │     ├─ AIRecommendation.jsx
│  │  │     ├─ DashboardHeader.jsx
│  │  │     ├─ ProductivityStats.jsx
│  │  │     ├─ QuickActions.jsx
│  │  │     ├─ RiskAlert.jsx
│  │  │     ├─ ScheduleTimeline.jsx
│  │  │     ├─ StatCard.jsx
│  │  │     ├─ TaskItem.jsx
│  │  │     ├─ TimelineItem.jsx
│  │  │     ├─ TodayTaskList.jsx
│  │  │     ├─ UpcomingDeadline.jsx
│  │  │     └─ WelcomeCard.jsx
│  │  ├─ services/
│  │  │  ├─ apiClient.js
│  │  │  └─ dashboardApi.js
│  │  ├─ styles/
│  │  │  └─ dashboard.css
│  │  └─ types/
│  │     └─ (types go here)
│  └─ (build/output)
│     ├─ node_modules/
│     ├─ dist/
│     └─ .vite/
│
└─ Backend/
   └─ (no files found yet; scaffold recommended)
```

## Notes / conventions
- React UI entry points: `Frontend/src/app/*`.
- Feature UI components: `Frontend/src/components/dashboard/*`.
- Shared components: `Frontend/src/components/common/*`.
- Data access: `Frontend/src/services/*`.
- Styles: `Frontend/src/styles/*`.

