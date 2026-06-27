from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    category: str | None = None
    priority: str = "medium"
    deadline: datetime | None = None
    estimated_hours: float | None = None


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    category: str | None = None
    priority: str | None = None
    status: str | None = None
    deadline: datetime | None = None
    estimated_hours: float | None = None
    completed_percent: int | None = Field(default=None, ge=0, le=100)


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None
    category: str | None
    priority: str
    status: str
    deadline: datetime | None
    estimated_hours: float | None
    completed_percent: int

    model_config = ConfigDict(from_attributes=True)
