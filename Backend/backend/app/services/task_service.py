from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate

TASK_COMPLETED = "completed"
TASK_OVERDUE = "overdue"

PRIORITY_CRITICAL = "critical"


def get_tasks_for_user(
    db: Session,
    user_id: int,
) -> list[Task]:
    """Return all tasks for a user ordered by newest first."""

    return (
        db.query(Task)
        .filter(Task.user_id == user_id)
        .order_by(Task.id.desc())
        .all()
    )


def create_task(
    db: Session,
    user_id: int,
    payload: TaskCreate,
) -> Task:
    """Create a new task."""

    task = Task(
        user_id=user_id,
        **payload.model_dump(),
    )

    db.add(task)

    try:
        db.commit()
        db.refresh(task)
    except Exception:
        db.rollback()
        raise

    return task


def update_task(
    db: Session,
    user_id: int,
    task_id: int,
    payload: TaskUpdate,
) -> Task | None:
    """Update an existing task."""

    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.user_id == user_id,
        )
        .first()
    )

    if task is None:
        return None

    updates = payload.model_dump(exclude_unset=True)

    for field, value in updates.items():
        setattr(task, field, value)

    try:
        db.commit()
        db.refresh(task)
    except Exception:
        db.rollback()
        raise

    return task


def delete_task(
    db: Session,
    user_id: int,
    task_id: int,
) -> bool:
    """Delete a task."""

    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.user_id == user_id,
        )
        .first()
    )

    if task is None:
        return False

    db.delete(task)

    try:
        db.commit()
    except Exception:
        db.rollback()
        raise

    return True


def mark_overdue_tasks(
    db: Session,
    user_id: int,
) -> int:
    """
    Mark all overdue tasks as 'overdue'.

    Returns the number of tasks updated.
    """

    now = datetime.now(timezone.utc)

    tasks = (
        db.query(Task)
        .filter(
            Task.user_id == user_id,
            Task.deadline < now,
            Task.status != TASK_COMPLETED,
        )
        .all()
    )

    for task in tasks:
        task.status = TASK_OVERDUE

    try:
        db.commit()
    except Exception:
        db.rollback()
        raise

    return len(tasks)


def reprioritise_tasks(
    db: Session,
    user_id: int,
) -> int:
    """
    Increase priority for overdue tasks.

    Returns the number of tasks checked.
    """

    now = datetime.now(timezone.utc)

    tasks = (
        db.query(Task)
        .filter(
            Task.user_id == user_id,
            Task.status != TASK_COMPLETED,
        )
        .all()
    )

    for task in tasks:
        if task.deadline and task.deadline <= now:
            task.priority = PRIORITY_CRITICAL

    try:
        db.commit()
    except Exception:
        db.rollback()
        raise

    return len(tasks)