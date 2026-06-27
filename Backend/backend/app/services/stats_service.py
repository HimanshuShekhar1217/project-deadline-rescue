from sqlalchemy.orm import Session

from app.models.alert import RiskAlert
from app.models.schedule import ScheduleEvent
from app.models.task import Task

TASK_COMPLETED = "completed"
FOCUS_EVENT = "focus"


def compute_productivity_stats(
    db: Session,
    user_id: int,
) -> dict[str, float | int]:
    """
    Compute productivity statistics for a user.
    """

    tasks_done = (
        db.query(Task)
        .filter(
            Task.user_id == user_id,
            Task.status == TASK_COMPLETED,
        )
        .count()
    )

    at_risk_count = (
        db.query(RiskAlert)
        .filter(
            RiskAlert.user_id == user_id,
            RiskAlert.is_dismissed.is_(False),
        )
        .count()
    )

    focus_events = (
        db.query(ScheduleEvent)
        .filter(
            ScheduleEvent.user_id == user_id,
            ScheduleEvent.type == FOCUS_EVENT,
        )
        .all()
    )

    focus_minutes = sum(
        (
            (event.end_time.hour * 60 + event.end_time.minute)
            - (event.start_time.hour * 60 + event.start_time.minute)
        )
        for event in focus_events
    )

    focus_hours = max(0.0, focus_minutes / 60)

    productivity_score = max(
        0,
        min(
            100,
            60 + (tasks_done * 5) - (at_risk_count * 10),
        ),
    )

    return {
        "tasks_done": tasks_done,
        "focus_hours": round(focus_hours, 2),
        "at_risk_count": at_risk_count,
        "productivity_score": productivity_score,
    }