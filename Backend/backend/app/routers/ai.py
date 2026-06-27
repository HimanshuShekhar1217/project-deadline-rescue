from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.ai import (
    AIActionResponse,
    AIApproval,
    AIRecommendationResponse,
)
from app.services import ai_service

router = APIRouter(
    prefix="/api/ai",
    tags=["AI"],
)


@router.post(
    "/recommend",
    response_model=AIRecommendationResponse,
    status_code=status.HTTP_200_OK,
)
def recommend(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return ai_service.get_recommendation(db, current_user.id)


@router.get(
    "/log",
    response_model=list[AIActionResponse],
    status_code=status.HTTP_200_OK,
)
def action_log(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return ai_service.get_action_log(db, current_user.id)


@router.post(
    "/approve",
    response_model=AIActionResponse,
    status_code=status.HTTP_200_OK,
)
def approve(
    payload: AIApproval,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    action = ai_service.approve_action(
        db=db,
        user_id=current_user.id,
        payload=payload,
    )

    if action is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="AI action not found",
        )

    return action