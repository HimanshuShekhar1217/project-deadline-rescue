from functools import lru_cache
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        # Make sure we load Backend/backend/.env when running from repo root
        env_file="Backend/backend/.env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
        populate_by_name=True,  # 👈 ADD THIS LINE
    )

    # ==========================
    # Database
    # ==========================
    database_url: str = Field(
        default="sqlite:///./app.db",
        alias="DATABASE_URL",
    )

    # ==========================
    # Security
    # ==========================
    secret_key: str = Field(
        default="change-me-in-development",
        alias="SECRET_KEY",
    )

    algorithm: str = "HS256"

    access_token_expire_minutes: int = 60 * 24

    # ==========================
    # AI
    # ==========================
    anthropic_api_key: str = Field(
        default="",
        alias="ANTHROPIC_API_KEY",
    )

    openai_api_key: str = Field(
        default="",
        alias="OPENAI_API_KEY",
    )

    # ==========================
    # Frontend
    # ==========================
    frontend_url: str = Field(
        default="http://localhost:5173",
        alias="FRONTEND_URL",
    )

    # ==========================
    # Application
    # ==========================
    app_name: str = "Productivity Rescue Backend"
    app_version: str = "0.1.0"
    debug: bool = False

@lru_cache
def get_settings() -> Settings:
    return Settings()

settings = get_settings()