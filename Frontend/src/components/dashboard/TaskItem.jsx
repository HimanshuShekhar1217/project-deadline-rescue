import { Check, Clock } from "lucide-react";

const fmtDeadline = (iso) => {
  const d = new Date(iso);
  const diff = d - new Date();
  const absH = Math.abs(diff) / (1000 * 60 * 60);

  if (diff < 0) return "Overdue";
  if (absH < 1) return `${Math.round(absH * 60)}m left`;
  if (absH < 24) return `${absH.toFixed(1)}h left`;

  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const TaskItem = ({ task, onToggle }) => {
  return (
    <article
      className={`task-item ${task.completed ? "done" : ""}`}
      data-testid={`task-item-${task.id}`}
    >
      <button
        type="button"
        className={`task-check ${task.completed ? "checked" : ""}`}
        onClick={() => onToggle?.(task.id)}
        aria-label={
          task.completed ? "Mark as incomplete" : "Mark as complete"
        }
        data-testid={`task-toggle-${task.id}`}
      >
        <Check size={12} strokeWidth={3} />
      </button>

      <div className="task-body">
        <h4 className="title">{task.title}</h4>

        <div className="meta">
          <span className="chip">{task.category}</span>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Clock size={11} />
            {fmtDeadline(task.deadline)}
          </span>

          {task.estimatedTime && <span>~ {task.estimatedTime}</span>}
        </div>

        {typeof task.progress === "number" && (
          <div
            className="progress"
            data-testid={`task-progress-${task.id}`}
            aria-label={`Progress ${task.completed ? 100 : task.progress}%`}
            title={`Progress ${task.completed ? 100 : task.progress}%`}
          >
            <div style={{ width: `${task.completed ? 100 : task.progress}%` }} />
          </div>
        )}
      </div>

      <span className={`task-pri ${task.priority}`}>
        {task.priority}
      </span>
    </article>
  );
};

export default TaskItem;