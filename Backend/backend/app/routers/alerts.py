from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.alert import AlertResponse
from app.services import alert_service

router = APIRouter(
    prefix="/api/alerts",
    tags=["Alerts"],
)


@router.get(
    "",
    response_model=list[AlertResponse],
    status_code=status.HTTP_200_OK,
)
def list_alerts(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return alert_service.get_active_alerts(db, current_user.id)


@router.post(
    "/{alert_id}/dismiss",
    response_model=AlertResponse,
    status_code=status.HTTP_200_OK,
)
def dismiss_alert(
    alert_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    alert = alert_service.dismiss_alert(
        db=db,
        user_id=current_user.id,
        alert_id=alert_id,
    )

    if alert is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found",
        )

    return alert