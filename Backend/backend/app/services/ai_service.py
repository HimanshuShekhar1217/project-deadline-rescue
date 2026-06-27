from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.ai_log import AIActionLog
from app.models.schedule import ScheduleEvent
from app.models.task import Task
from app.schemas.ai import AIApproval, AIRecommendationResponse


def build_context(db: Session, user_id: int) -> dict[str, list[dict[str, str]]]:
    tasks = db.query(Task).filter(Task.user_id == user_id).all()
    schedule = db.query(ScheduleEvent).filter(ScheduleEvent.user_id == user_id).all()
    return {
        "tasks": [{"title": task.title, "priority": task.priority, "status": task.status} for task in tasks],
        "schedule": [{"title": event.title, "type": event.type} for event in schedule],
    }


def get_recommendation(db: Session, user_id: int) -> AIRecommendationResponse:
    context = build_context(db, user_id)
    risky = [task for task in context["tasks"] if task["priority"] in {"high", "critical"}]
    steps = ["Review deadlines", "Protect a focus block", "Finish the highest priority task first"]
    if risky:
        steps.insert(0, f"Start with {risky[0]['title']}")
    return AIRecommendationResponse(
        summary="A practical rescue plan is ready based on your current tasks and schedule.",
        steps=steps,
        confidence_score=0.78,
        type="rescue_plan",
    )


def run_autonomous_agent(db: Session, user_id: int) -> AIActionLog:
    action = AIActionLog(
        user_id=user_id,
        action_type="focus_block",
        description="Suggested adding a protected focus block for the highest priority work.",
        status="pending",
        requires_approval=True,
    )
    db.add(action)
    db.commit()
    db.refresh(action)
    return action


def get_action_log(db: Session, user_id: int) -> list[AIActionLog]:
    return (
        db.query(AIActionLog)
        .filter(AIActionLog.user_id == user_id)
        .order_by(AIActionLog.created_at.desc())
        .all()
    )


def approve_action(db: Session, user_id: int, payload: AIApproval) -> AIActionLog | None:
    action = (
        db.query(AIActionLog)
        .filter(AIActionLog.id == payload.action_id, AIActionLog.user_id == user_id)
        .first()
    )
    if action is None:
        return None
    action.status = "done" if payload.approved else "rejected"
    action.approved_at = datetime.now(timezone.utc) if payload.approved else None
    db.commit()
    db.refresh(action)
    return action
