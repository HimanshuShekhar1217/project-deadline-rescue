from sqlalchemy.orm import Session

from app.models.alert import RiskAlert
from app.models.task import Task

ALERT_INFO = "info"
ALERT_WARNING = "warning"
ALERT_CRITICAL = "critical"

TASK_HIGH = "high"
TASK_CRITICAL = "critical"
TASK_COMPLETED = "completed"


def get_active_alerts(
    db: Session,
    user_id: int,
) -> list[RiskAlert]:
    """Return all active (non-dismissed) alerts for a user."""

    return (
        db.query(RiskAlert)
        .filter(
            RiskAlert.user_id == user_id,
            RiskAlert.is_dismissed.is_(False),
        )
        .order_by(RiskAlert.created_at.desc())
        .all()
    )


def create_alert(
    db: Session,
    user_id: int,
    title: str,
    message: str,
    severity: str = ALERT_INFO,
    task_id: int | None = None,
) -> RiskAlert:
    """Create a new risk alert."""

    alert = RiskAlert(
        user_id=user_id,
        task_id=task_id,
        title=title,
        message=message,
        severity=severity,
    )

    db.add(alert)

    try:
        db.commit()
        db.refresh(alert)
    except Exception:
        db.rollback()
        raise

    return alert


def dismiss_alert(
    db: Session,
    user_id: int,
    alert_id: int,
) -> RiskAlert | None:
    """Dismiss an existing alert."""

    alert = (
        db.query(RiskAlert)
        .filter(
            RiskAlert.id == alert_id,
            RiskAlert.user_id == user_id,
        )
        .first()
    )

    if alert is None:
        return None

    alert.is_dismissed = True

    try:
        db.commit()
        db.refresh(alert)
    except Exception:
        db.rollback()
        raise

    return alert


def scan_and_fire_alerts(
    db: Session,
    user_id: int,
) -> int:
    """
    Scan user tasks and create alerts for high-risk tasks
    that do not already have an active alert.
    """

    risky_tasks = (
        db.query(Task)
        .filter(
            Task.user_id == user_id,
            Task.priority.in_([TASK_HIGH, TASK_CRITICAL]),
            Task.status != TASK_COMPLETED,
        )
        .all()
    )

    created = 0

    for task in risky_tasks:
        existing_alert = (
            db.query(RiskAlert)
            .filter(
                RiskAlert.user_id == user_id,
                RiskAlert.task_id == task.id,
                RiskAlert.is_dismissed.is_(False),
            )
            .first()
        )

        if existing_alert:
            continue

        severity = (
            ALERT_CRITICAL
            if task.priority == TASK_CRITICAL
            else ALERT_WARNING
        )

        create_alert(
            db=db,
            user_id=user_id,
            title=f"{task.priority.title()} priority task needs attention",
            message=task.title,
            severity=severity,
            task_id=task.id,
        )

        created += 1

    return created