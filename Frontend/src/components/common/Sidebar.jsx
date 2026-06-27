import React, { useState } from "react";
import {
  LayoutDashboard,
  ListChecks,
  CalendarDays,
  Bot,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";

const PRIMARY = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tasks", label: "Tasks", icon: ListChecks, badge: 8 },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "ai", label: "AI Agent", icon: Bot },
];
const SECONDARY = [
  { id: "stats", label: "Analytics", icon: TrendingUp },
  { id: "team", label: "Team", icon: Users },
];

const Sidebar = () => {
  const [active, setActive] = useState("dashboard");

  return (
    <aside className="sidebar" data-testid="app-sidebar">
      <div className="side-section">Workspace</div>
      {PRIMARY.map((it) => {
        const Icon = it.icon;
        return (
          <button
            key={it.id}
            className={`side-link ${active === it.id ? "active" : ""}`}
            onClick={() => setActive(it.id)}
            data-testid={`sidebar-${it.id}`}
          >
            <Icon size={16} />
            <span>{it.label}</span>
            {it.badge && <span className="badge">{it.badge}</span>}
          </button>
        );
      })}

      <div className="side-section">Insights</div>
      {SECONDARY.map((it) => {
        const Icon = it.icon;
        return (
          <button
            key={it.id}
            className={`side-link ${active === it.id ? "active" : ""}`}
            onClick={() => setActive(it.id)}
            data-testid={`sidebar-${it.id}`}
          >
            <Icon size={16} />
            <span>{it.label}</span>
          </button>
        );
      })}

      <div className="side-footer" data-testid="sidebar-upsell">
        <h5>
          <Sparkles
            size={12}
            style={{ display: "inline", marginRight: 6, color: "var(--accent)" }}
          />
          Pro tip
        </h5>
        <p>
          Let the AI agent reschedule overdue work for you while you focus on
          the most critical deadline.
        </p>
        <button data-testid="sidebar-enable-ai-btn">Enable AI Agent</button>
      </div>
    </aside>
  );
};

export default Sidebar;
