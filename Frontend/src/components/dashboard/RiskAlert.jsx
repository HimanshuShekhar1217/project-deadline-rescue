
import React from "react";
import { AlertCircle, AlertTriangle, Info, Bot } from "lucide-react";

const ICON_BY_SEVERITY = {
  critical: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const RiskAlert = ({ alert, onAction }) => {
  const Icon = ICON_BY_SEVERITY[alert.severity] || Info;
  const isPrimary = (idx) => idx === 0;

  return (
    <article
      className={`alert ${alert.severity}`}
      data-testid={`risk-alert-${alert.id}`}
    >
      <div className="alert-icon">
        <Icon size={18} />
      </div>
      <div>
        <h4 className="alert-title">
          {alert.title}
          {alert.autoTag && (
            <span className="auto-tag">
              <Bot size={9} />
              {alert.autoTag}
            </span>
          )}
        </h4>
        <p className="alert-msg">{alert.message}</p>
      </div>
      <div className="alert-actions">
        {alert.actions.map((action, idx) => (
          <button
            key={action}
            className={`btn ${isPrimary(idx) ? "btn-primary" : "btn-ghost"}`}
            onClick={() => onAction?.(alert.id, action)}
            data-testid={`alert-${alert.id}-action-${idx}`}
          >
            {action}
          </button>
        ))}
      </div>
    </article>
  );
};

export default RiskAlert;