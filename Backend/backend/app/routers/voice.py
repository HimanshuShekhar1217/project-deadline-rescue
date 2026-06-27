from fastapi import APIRouter, Depends, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.voice_service import execute_voice_action


class VoiceCommand(BaseModel):
    transcript: str


class VoiceResponse(BaseModel):
    response: str
    actions_taken: list[str]


router = APIRouter(
    prefix="/api/voice",
    tags=["Voice"],
)


@router.post(
    "/command",
    response_model=VoiceResponse,
    status_code=status.HTTP_200_OK,
)
def command(
    payload: VoiceCommand,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return execute_voice_action(
        db=db,
        user_id=current_user.id,
        transcript=payload.transcript,
    )
