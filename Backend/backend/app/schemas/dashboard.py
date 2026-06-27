from pydantic import BaseModel

from app.schemas.ai import AIRecommendationResponse
from app.schemas.alert import AlertResponse
from app.schemas.schedule import ScheduleEventResponse
from app.schemas.task import TaskResponse
from app.schemas.user import UserResponse


class DashboardStats(BaseModel):
    tasks_done: int
    focus_hours: float
    at_risk_count: int
    productivity_score: int


class DashboardResponse(BaseModel):
    user: UserResponse
    tasks: list[TaskResponse]
    schedule: list[ScheduleEventResponse]
    stats: DashboardStats
    alerts: list[AlertResponse]
    ai_recommendation: AIRecommendationResponse

