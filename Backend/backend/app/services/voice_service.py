from sqlalchemy.orm import Session

from app.services.ai_service import get_recommendation

INTENT_RECOMMEND = "recommend"
INTENT_NOTE = "note"


def parse_command(transcript: str) -> dict[str, str]:
    """
    Parse a voice transcript and determine the user's intent.
    """

    normalized = transcript.strip().lower()

    recommendation_keywords = {
        "plan",
        "help",
        "recommend",
        "suggest",
        "advice",
    }

    if any(keyword in normalized for keyword in recommendation_keywords):
        return {
            "intent": INTENT_RECOMMEND,
            "text": transcript,
        }

    return {
        "intent": INTENT_NOTE,
        "text": transcript,
    }


def execute_voice_action(
    db: Session,
    user_id: int,
    transcript: str,
) -> dict[str, object]:
    """
    Execute the requested voice command.
    """

    command = parse_command(transcript)

    if command["intent"] == INTENT_RECOMMEND:
        recommendation = get_recommendation(db, user_id)

        return {
            "response": recommendation.summary,
            "actions_taken": recommendation.steps,
        }

    return {
        "response": "Command received successfully. No action was required.",
        "actions_taken": [],
    }