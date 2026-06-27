from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.schedule import (
    ScheduleEventCreate,
    ScheduleEventResponse,
)
from app.services import schedule_service

router = APIRouter(
    prefix="/api/schedule",
    tags=["Schedule"],
)


@router.get(
    "",
    response_model=list[ScheduleEventResponse],
    status_code=status.HTTP_200_OK,
)
def list_schedule(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return schedule_service.get_schedule(db, current_user.id)


@router.post(
    "",
    response_model=ScheduleEventResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_event(
    payload: ScheduleEventCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return schedule_service.create_event(
        db=db,
        user_id=current_user.id,
        payload=payload,
    )


@router.delete(
    "/{event_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_event(
    event_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    deleted = schedule_service.delete_event(
        db=db,
        user_id=current_user.id,
        event_id=event_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Schedule event not found",
        )

    return Response(status_code=status.HTTP_204_NO_CONTENT)