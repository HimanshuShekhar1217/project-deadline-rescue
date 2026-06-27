import React from "react";
import { Activity } from "lucide-react";
import Card from "../common/Card";
import StatCard from "./StatCard";

const ProductivityStats = ({ stats = [] }) => {
  return (
    <Card
      className="fade-up d2"
      testId="productivity-stats"
      title="Productivity"
      icon={<Activity size={14} />}
    >
      <div className="stats-grid">
        {stats.map((s) => (
          <StatCard key={s.id} stat={s} />
        ))}
      </div>
    </Card>
  );
};

export default ProductivityStats;
