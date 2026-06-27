
import React from "react";
import { Target, Plus, CalendarSync, Wand2 } from "lucide-react";
import Card from "../common/Card";

const ACTIONS = [
  { id: "focus", label: "Start focus", sub: "Deep work · 90 min", icon: Target, color: "accent" },
  { id: "add", label: "Add task", sub: "Quick capture", icon: Plus, color: "info" },
  { id: "reschedule", label: "Reschedule", sub: "Move overdue", icon: CalendarSync, color: "warn" },
  { id: "ai", label: "Ask AI", sub: "Get next best move", icon: Wand2, color: "violet" },
];

const QuickActions = ({ onAction }) => {
  return (
    <Card
      className="fade-up d4"
      testId="quick-actions"
      title="Quick Actions"
      icon={<Wand2 size={14} />}
    >
      <div className="quick-grid">
        {ACTIONS.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.id}
              className="quick-btn"
              data-color={a.color}
              onClick={() => onAction?.(a.id)}
              data-testid={`quick-action-${a.id}`}
            >
              <div className="q-ico">
                <Icon size={15} />
              </div>
              <div className="q-label">{a.label}</div>
              <div className="q-sub">{a.sub}</div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickActions;