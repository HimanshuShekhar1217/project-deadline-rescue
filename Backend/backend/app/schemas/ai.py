from pydantic import BaseModel, ConfigDict


class AIRecommendationResponse(BaseModel):
    summary: str
    steps: list[str]
    confidence_score: float
    type: str


class AIActionResponse(BaseModel):
    id: int
    action_type: str
    description: str
    status: str

    model_config = ConfigDict(from_attributes=True)


class AIApproval(BaseModel):
    action_id: int
    approved: bool

    model_config = ConfigDict(from_attributes=True)