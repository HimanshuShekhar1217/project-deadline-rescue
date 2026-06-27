from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.dashboard import DashboardResponse
from app.services import (
    ai_service,
    alert_service,
    schedule_service,
    stats_service,
    task_service,
)

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "",
    response_model=DashboardResponse,
    status_code=status.HTTP_200_OK,
)
def dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return {
        "user": current_user,
        "tasks": task_service.get_tasks_for_user(
            db,
            current_user.id,
        ),
        "schedule": schedule_service.get_schedule(
            db,
            current_user.id,
        ),
        "stats": stats_service.compute_productivity_stats(
            db,
            current_user.id,
        ),
        "alerts": alert_service.get_active_alerts(
            db,
            current_user.id,
        ),
        "ai_recommendation": ai_service.get_recommendation(
            db,
            current_user.id,
        ),
    }