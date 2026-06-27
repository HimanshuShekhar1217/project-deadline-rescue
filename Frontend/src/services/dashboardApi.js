const wait = (ms = 280) => new Promise((resolve) => setTimeout(resolve, ms));

const NOW = new Date();
const inHours = (h) =>
  new Date(NOW.getTime() + h * 60 * 60 * 1000).toISOString();

const seedTasks = [
  {
    id: "t1",
    title: "Finalize Q3 Report",
    category: "Finance",
    deadline: inHours(2),
    progress: 45,
    priority: "critical",
    completed: false,
    estimatedTime: "3h",
  },
  {
    id: "t2",
    title: "Client Presentation Slides",
    category: "Design",
    deadline: inHours(5),
    progress: 70,
    priority: "high",
    completed: false,
    estimatedTime: "1h 30m",
  },
  {
    id: "t3",
    title: "Code Review — Auth Module",
    category: "Engineering",
    deadline: inHours(8),
    progress: 20,
    priority: "medium",
    completed: false,
    estimatedTime: "45m",
  },
  {
    id: "t4",
    title: "Deploy Staging Env",
    category: "DevOps",
    deadline: inHours(22),
    progress: 0,
    priority: "high",
    completed: false,
    estimatedTime: "1h",
  },
  {
    id: "t5",
    title: "Weekly Standup Notes",
    category: "Team",
    deadline: inHours(-1),
    progress: 100,
    priority: "low",
    completed: true,
    estimatedTime: "15m",
  },
];

const seedSchedule = [
  { id: "s1", time: "09:00 – 11:00", label: "Deep work — Q3 Report", type: "focus" },
  { id: "s2", time: "11:00 – 11:15", label: "Coffee break", type: "break" },
  { id: "s3", time: "11:15 – 12:00", label: "Client sync call", type: "meeting" },
  { id: "s4", time: "14:00 – 15:30", label: "Focus block — Q3 Report", type: "now", aiInserted: true },
  { id: "s5", time: "14:00 – 15:30", label: "Distractions blocked (Slack, social)", type: "blocked" },
  { id: "s6", time: "16:00 – 17:30", label: "Code review — Auth module", type: "focus" },
];

const seedStats = [
  { id: "k1", label: "Tasks done", value: 8, unit: "today", trend: "up", trendLabel: "+14% vs yesterday", icon: "ClipboardCheck" },
  { id: "k2", label: "Focus time", value: 4.5, unit: "hours", trend: "up", trendLabel: "+8% vs yesterday", icon: "Clock" },
  { id: "k3", label: "At risk", value: 2, unit: "tasks", trend: "down", trendLabel: "-33% vs yesterday", accent: "#FF4D6A", icon: "AlertTriangle" },
  { id: "k4", label: "AI actions", value: 7, unit: "auto-run today", trend: "up", trendLabel: "3 pending approval", accent: "#00D4AA", icon: "Bot" },
];

const seedAlerts = [
  {
    id: "a1",
    severity: "critical",
    title: "Q3 Report deadline in 2 hours",
    message: "45% complete · 3h estimated remaining · AI auto-blocked your next 2hrs",
    autoTag: "Auto-actioned",
    actions: ["Focus now", "Undo AI action"],
  },
  {
    id: "a2",
    severity: "warning",
    title: "Staging deploy overdue — AI delegated to teammate",
    message: "Automatically reassigned to Jay at 13:42 · Awaiting confirmation",
    autoTag: "Delegated",
    actions: ["Review", "Undo"],
  },
];

const seedDeadlines = [
  { id: "d1", title: "Q3 Report", due: inHours(2), countdown: "2h 14m", severity: "critical" },
  { id: "d2", title: "Client Presentation", due: inHours(5), countdown: "5h 02m", severity: "warning" },
  { id: "d3", title: "Code Review", due: inHours(8), countdown: "8h 41m", severity: "info" },
  { id: "d4", title: "Deploy Staging", due: inHours(22), countdown: "22h 10m", severity: "info" },
];

const seedAIPlan = {
  summary: "You're at risk of missing 2 deadlines today. Here's a 3-step rescue plan that reclaims 2.5 hours and protects your most critical work.",
  steps: [
    { id: "p1", title: "Lock a 90-min focus block now", detail: "Block 14:00–15:30 for Q3 Report. Slack & email muted automatically." },
    { id: "p2", title: "Delegate Staging Deploy to Jay", detail: "Send a one-tap handoff; AI drafts the context note for you." },
    { id: "p3", title: "Push Code Review to tomorrow 09:00", detail: "Lowest urgency today — reviewer is offline until then anyway." },
  ],
};

let tasksStore = [...seedTasks];
let alertsStore = [...seedAlerts];

export const dashboardApi = {
  async fetchDashboard() {
    // ✅ Use relative path so Vite proxy forwards to backend
    // If backend is not running (ECONNREFUSED), fall back to mock data.
    try {
      const response = await fetch("/api/dashboard");
      if (!response.ok) throw new Error("Failed to fetch dashboard");
      return await response.json();
    } catch (e) {
      // Provide the exact shape the Dashboard expects
      // NOTE: Vite proxy errors may still appear in terminal, but UI will work.
      return {
        user: {
          name: "",
          greeting: "Welcome back Himanshu",
        },
        progress: computeOverallProgress(tasksStore),
        tasks: tasksStore,
        schedule: seedSchedule,
        stats: seedStats,
        alerts: alertsStore,
        deadlines: seedDeadlines,
        aiPlan: seedAIPlan,
      };
    }
  },

  async toggleTask(id) {
    await wait(120);

    tasksStore = tasksStore.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
            progress: !task.completed ? 100 : task.progress,
          }
        : task
    );

    return tasksStore.find((task) => task.id === id);
  },

  async dismissAlert(id) {
    await wait(120);
    alertsStore = alertsStore.filter((alert) => alert.id !== id);
    return { ok: true };
  },

  async regenerateAIPlan() {
    await wait(600);
    return seedAIPlan;
  },
};

export function greetingForNow() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function computeOverallProgress(tasks) {
  if (!tasks.length) return 0;
  const total = tasks.reduce(
    (sum, task) => sum + (task.completed ? 100 : task.progress),
    0
  );
  return Math.round(total / tasks.length);
}
