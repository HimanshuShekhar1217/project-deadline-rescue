import React from "react";

const TimelineItem = ({ event = {} }) => {
  const { id, time, label, type, aiInserted } = event;

  return (
    <div className={`tl-item ${type || ""} ${aiInserted ? "ai-inserted" : ""}`} data-testid={`tl-item-${id}`}>
      <div className="tl-time">{time}</div>

      <div>
        <div className="tl-label">
          {label}
          {aiInserted && <span className="ai-tag">AI</span>}
        </div>
      </div>

      <div>
        <span className={`tl-badge ${type || ""}`}>{type || "event"}</span>
      </div>
    </div>
  );
};

export default TimelineItem;