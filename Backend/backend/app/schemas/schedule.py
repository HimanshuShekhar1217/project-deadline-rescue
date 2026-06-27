from datetime import date, time

from pydantic import BaseModel, ConfigDict, Field


class ScheduleEventCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    type: str = Field(default="work", max_length=30)
    start_time: time
    end_time: time
    date: date
    task_id: int | None = None


class ScheduleEventResponse(BaseModel):
    id: int
    title: str
    type: str
    start_time: time
    end_time: time
    date: date
    task_id: int | None = None

    model_config = ConfigDict(from_attributes=True)