
import React from "react";
import { Hourglass } from "lucide-react";
import Card from "../common/Card";

const UpcomingDeadline = ({ deadlines = [] }) => {
  return (
    <Card
      className="fade-up d5"
      testId="upcoming-deadlines"
      title="Upcoming Deadlines"
      icon={<Hourglass size={14} />}
      action={
        <span className="hdr-link" data-testid="deadlines-meta">
          {deadlines.length} upcoming
        </span>
      }
    >
      <div className="deadline-list">
        {deadlines.map((d) => (
          <article
            key={d.id}
            className={`deadline ${d.severity}`}
            data-testid={`deadline-${d.id}`}
          >
            <div>
              <h4 className="dl-title">{d.title}</h4>
              <div className="dl-meta">
                Due{" "}
                {new Date(d.due).toLocaleString("en-US", {
                  weekday: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <span className="dl-count">{d.countdown}</span>
          </article>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingDeadline;