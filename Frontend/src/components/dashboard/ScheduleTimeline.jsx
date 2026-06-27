import { CalendarClock } from "lucide-react";
import React, { useMemo, useState } from "react";
import Card from "../common/Card";
import TimelineItem from "./TimelineItem";

const ScheduleTimeline = ({ events = [] }) => {
  const [view, setView] = useState(0);

  const views = useMemo(() => {
    const focusFirst = [...events].sort((a, b) => {
      if (a.type === "focus" && b.type !== "focus") return -1;
      if (b.type === "focus" && a.type !== "focus") return 1;
      return 0;
    });

    const compact = events.map((e, i) => ({ ...e, time: i === 0 ? e.time : "" }));

    return [
      { name: "AI plan", items: events },
      { name: "Focus first", items: focusFirst },
      { name: "Compact", items: compact },
    ];
  }, [events]);

  const current = views[view] || views[0];

  return (
    <Card
      className="fade-up d3"
      testId="schedule-timeline"
      title="AI-Generated Schedule"
      icon={<CalendarClock size={14} />}
      action={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="hdr-link" data-testid="schedule-meta">
            {current.items.length} blocks — {current.name}
          </span>
          <button
            type="button"
            className="hdr-action-btn"
            onClick={() => setView((v) => (v + 1) % views.length)}
            title="Switch schedule view"
            data-testid="schedule-toggle"
          >
            View
          </button>
        </div>
      }
    >
      <div className="timeline">
        {current.items.map((event) => (
          <TimelineItem key={event.id} event={event} />
        ))}
      </div>
    </Card>
  );
};

export default ScheduleTimeline;