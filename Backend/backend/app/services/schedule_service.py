from datetime import date

from sqlalchemy.orm import Session

from app.models.schedule import ScheduleEvent
from app.schemas.schedule import ScheduleEventCreate


def get_todays_schedule(
    db: Session,
    user_id: int,
) -> list[ScheduleEvent]:
    """Return today's schedule for the user."""

    return (
        db.query(ScheduleEvent)
        .filter(
            ScheduleEvent.user_id == user_id,
            ScheduleEvent.date == date.today(),
        )
        .order_by(ScheduleEvent.start_time)
        .all()
    )


def get_schedule(
    db: Session,
    user_id: int,
) -> list[ScheduleEvent]:
    """Return the complete schedule ordered by date and time."""

    return (
        db.query(ScheduleEvent)
        .filter(ScheduleEvent.user_id == user_id)
        .order_by(
            ScheduleEvent.date,
            ScheduleEvent.start_time,
        )
        .all()
    )


def create_event(
    db: Session,
    user_id: int,
    payload: ScheduleEventCreate,
) -> ScheduleEvent:
    """Create a new schedule event."""

    event = ScheduleEvent(
        user_id=user_id,
        **payload.model_dump(),
    )

    db.add(event)

    try:
        db.commit()
        db.refresh(event)
    except Exception:
        db.rollback()
        raise

    return event


def delete_event(
    db: Session,
    user_id: int,
    event_id: int,
) -> bool:
    """Delete a schedule event."""

    event = (
        db.query(ScheduleEvent)
        .filter(
            ScheduleEvent.id == event_id,
            ScheduleEvent.user_id == user_id,
        )
        .first()
    )

    if event is None:
        return False

    db.delete(event)

    try:
        db.commit()
    except Exception:
        db.rollback()
        raise

    return True


def insert_focus_block(
    db: Session,
    user_id: int,
    payload: ScheduleEventCreate,
) -> ScheduleEvent:
    """Insert an AI-generated focus block."""

    return create_event(
        db=db,
        user_id=user_id,
        payload=payload,
    )


def reschedule_overdue(
    db: Session,
    user_id: int,
) -> int:
    """
    Placeholder implementation.

    Later this can move overdue events
    to the next available time slot.
    """

    return len(get_todays_schedule(db, user_id))