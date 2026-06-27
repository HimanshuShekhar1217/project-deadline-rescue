from pydantic import BaseModel, ConfigDict


class AlertResponse(BaseModel):
    id: int
    severity: str
    title: str
    message: str
    is_dismissed: bool

    model_config = ConfigDict(from_attributes=True)


class AlertDismiss(BaseModel):
    alert_id: int

    model_config = ConfigDict(from_attributes=True)