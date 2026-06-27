import { ClipboardList } from "lucide-react";
import Card from "../common/Card";
import TaskItem from "./TaskItem";

const TodayTaskList = ({ tasks = [], onToggle }) => {
  const remaining = tasks.filter((task) => !task.completed).length;

  return (
    <Card
      className="fade-up d2"
      testId="today-task-list"
      title="Today's Tasks"
      icon={<ClipboardList size={14} />}
      action={
        <span className="hdr-link" data-testid="task-list-meta">
          {remaining} remaining · {tasks.length} total
        </span>
      }
    >
      <div className="card-count" data-testid="today-tasks-count">{tasks.length}</div>
      <div className="task-list">
        {tasks.length === 0 && (
          <p
            style={{
              color: "var(--text-3)",
              fontSize: 13,
              margin: 0,
            }}
          >
            Nothing on the list — the AI agent will surface new work as it
            comes in.
          </p>
        )}

        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
          />
        ))}
      </div>
    </Card>
  );
};

export default TodayTaskList;