import { RefreshCw, Plus } from "lucide-react";

const fmt = (date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const DashboardHeader = ({
  onRefresh,
  onAddTask,
  refreshing = false,
}) => {
  return (
    <header className="dh" data-testid="dashboard-header">
      <div className="dh-meta">
        <small>{fmt(new Date())}</small>
        <h1>Deadline Rescue · Dashboard</h1>
        <p>
          Your AI co-pilot is watching every deadline so you don&apos;t have
          to.
        </p>
      </div>

      <div className="dh-actions">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onRefresh}
          data-testid="refresh-btn"
        >
          <RefreshCw
            size={14}
            className={refreshing ? "spin" : ""}
          />
          Refresh
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onAddTask}
          data-testid="add-task-btn"
        >
          <Plus size={14} />
          Add task
        </button>
      </div>

      <style>{`
        .spin {
          animation: rot 700ms linear infinite;
        }

        @keyframes rot {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </header>
  );
};

export default DashboardHeader;