import {
  ClipboardCheck,
  Clock,
  AlertTriangle,
  Bot,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const ICON_MAP = {
  ClipboardCheck,
  Clock,
  AlertTriangle,
  Bot,
};

const StatCard = ({ stat }) => {
  const Icon = ICON_MAP[stat.icon] || ClipboardCheck;
  const Trend = stat.trend === "down" ? TrendingDown : TrendingUp;

  return (
    <article className="stat-card" data-testid={`stat-${stat.id}`}>
      <div className="glint" />

      <div
        className="sc-ico"
        style={
          stat.accent
            ? {
                background: `${stat.accent}1A`,
                color: stat.accent,
              }
            : undefined
        }
      >
        <Icon size={15} />
      </div>

      <div className="sc-lbl">{stat.label}</div>

      <div
        className="sc-val"
        style={stat.accent ? { color: stat.accent } : undefined}
      >
        {stat.value}
        <span className="sc-unit">{stat.unit}</span>
      </div>

      <div
        className={`sc-trend ${stat.trend === "down" ? "down" : ""}`}
      >
        <Trend size={11} />
        {stat.trendLabel}
      </div>
    </article>
  );
};

export default StatCard;