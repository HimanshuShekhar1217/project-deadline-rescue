import React from "react";
import { Bolt, Search, Bell, Settings } from "lucide-react";

const Navbar = ({
  unreadAlerts = 2,
  user = {
    name: "Himanshu Shekhar",
    role: "Product Lead",
  },
}) => {
  const initials = (user.name || "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <nav className="navbar" data-testid="app-navbar">
      <div className="nav-brand" data-testid="brand-logo">
        <span className="mark">
          <Bolt size={18} strokeWidth={2.4} />
        </span>

        <span className="name">
          Deadline<span>Rescue</span>
        </span>
      </div>

      <label className="nav-search" data-testid="nav-search">
        <Search size={14} />
        <input
          type="text"
          placeholder="Search tasks, deadlines, AI actions…"
          data-testid="search-input"
        />
      </label>

      <div className="nav-actions">
        <button
          type="button"
          className="nav-icon-btn"
          aria-label="Notifications"
          data-testid="nav-alerts-btn"
        >
          <Bell size={16} />
          {unreadAlerts > 0 && <span className="dot" />}
        </button>

        <button
          type="button"
          className="nav-icon-btn"
          aria-label="Settings"
          data-testid="nav-settings-btn"
        >
          <Settings size={16} />
        </button>

        <div className="nav-avatar" data-testid="nav-avatar">
          <span className="ph">{initials}</span>

          <span className="who">
            <b>{user.name}</b>
            <small>{user.role}</small>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;