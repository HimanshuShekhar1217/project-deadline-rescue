
import React from "react";
import Card from "../common/Card";

const WelcomeCard = ({ name = "there", greeting = "Hello", progress = 0, tasksDone = 0, tasksTotal = 0 }) => {
  return (
    <Card className="welcome fade-up" testId="welcome-card">
      <div className="glow" />
      <h2 className="greeting" data-testid="welcome-greeting">
        {greeting}, {name} 👋
      </h2>
      <p className="sub">
        You&apos;ve completed <b style={{ color: "var(--text-0)" }}>{tasksDone} of {tasksTotal}</b>{" "}
        tasks today. Keep the momentum — the AI agent is handling the rest in the background.
      </p>

      <div className="progress-wrap">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
            data-testid="welcome-progress-bar"
          />
        </div>
        <div className="progress-num" data-testid="welcome-progress-num">
          {progress}%
        </div>
      </div>
    </Card>
  );
};

export default WelcomeCard;