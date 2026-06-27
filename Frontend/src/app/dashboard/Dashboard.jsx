import React, { useCallback, useEffect, useMemo, useState } from "react";
import { dashboardApi } from "../../services/dashboardApi";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import AIRecommendation from "../../components/dashboard/AIRecommendation";
import TodayTaskList from "../../components/dashboard/TodayTaskList";
import ScheduleTimeline from "../../components/dashboard/ScheduleTimeline";
import ProductivityStats from "../../components/dashboard/ProductivityStats";
import RiskAlert from "../../components/dashboard/RiskAlert";
import QuickActions from "../../components/dashboard/QuickActions";
import UpcomingDeadline from "../../components/dashboard/UpcomingDeadline";
import Card from "../../components/common/Card";

/**
 * Main dashboard page — orchestrates state, data fetching, and renders the
 * full grid of dashboard components.
 */
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const load = useCallback(async () => {
    const d = await dashboardApi.fetchDashboard();
    setData(d);
  }, []);

  useEffect(() => {
    (async () => {
      await load();
      setLoading(false);
    })();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setTimeout(() => setRefreshing(false), 400);
  }, [load]);

  const onToggleTask = useCallback(async (id) => {
    await dashboardApi.toggleTask(id);
    await load();
  }, [load]);

  const onDismissAlert = useCallback(
    async (id, action) => {
      // Dismiss only on undo/review actions; primary action keeps the alert.
      if (typeof action === "string" && /undo|review/i.test(action)) {
        await dashboardApi.dismissAlert(id);
        await load();
      }
    },
    [load]
  );

  const onRegeneratePlan = useCallback(async () => {
    setRegenerating(true);
    const plan = await dashboardApi.regenerateAIPlan();
    setData((d) => ({ ...d, aiPlan: plan }));
    setRegenerating(false);
  }, []);

  const stats = useMemo(() => data?.stats ?? [], [data]);
  const tasksDone = useMemo(
    () => (data?.tasks ?? []).filter((t) => t.completed).length,
    [data]
  );

  if (loading || !data) {
    return (
      <div data-testid="dashboard-loading">
        <div className="dh">
          <div className="dh-meta" style={{ width: "100%" }}>
            <div
              className="skeleton"
              style={{ height: 14, width: 220, marginBottom: 10 }}
            />
            <div className="skeleton" style={{ height: 28, width: 360 }} />
          </div>
        </div>
        <div className="dashboard-grid">
          <div className="col">
            <div className="skeleton" style={{ height: 160 }} />
            <div className="skeleton" style={{ height: 220 }} />
          </div>
          <div className="col">
            <div className="skeleton" style={{ height: 240 }} />
            <div className="skeleton" style={{ height: 160 }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="dashboard-page">
      <DashboardHeader
        onRefresh={onRefresh}
        onAddTask={() => alert("Add task — wire this to your task creator")}
        refreshing={refreshing}
      />

      <div className="dashboard-grid">
        {/* LEFT (wider) column */}
        <div className="col">
          <WelcomeCard
            name={data.user.name}
            greeting={data.user.greeting}
            progress={data.progress}
            tasksDone={tasksDone}
            tasksTotal={data.tasks.length}
          />

          <AIRecommendation
            plan={data.aiPlan}
            onRegenerate={onRegeneratePlan}
            regenerating={regenerating}
          />

          <TodayTaskList tasks={data.tasks} onToggle={onToggleTask} />

          {data.alerts.length > 0 && (
            <Card
              className="fade-up d3"
              testId="risk-alerts-card"
              title="Risk Alerts"
              action={
                <span className="hdr-link" data-testid="alerts-meta">
                  {data.alerts.length} active
                </span>
              }
            >
              <div className="alerts">
                {data.alerts.map((a) => (
                  <RiskAlert key={a.id} alert={a} onAction={onDismissAlert} />
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* RIGHT column */}
        <div className="col">
          <ProductivityStats stats={stats} />
          <ScheduleTimeline events={data.schedule} />
          <QuickActions onAction={(id) => console.log("[QuickAction]", id)} />
          <UpcomingDeadline deadlines={data.deadlines} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

