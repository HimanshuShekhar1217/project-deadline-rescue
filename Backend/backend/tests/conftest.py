import os
import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

os.environ["DATABASE_URL"] = "sqlite:///./test.db"

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.core.database import Base, engine  # noqa: E402
from main import app  # noqa: E402


@pytest.fixture(scope="function", autouse=True)
def reset_db():
    """
    Create a fresh database for every test.
    """

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    yield

    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client() -> TestClient:
    """
    Return a FastAPI test client.
    """

    return TestClient(app)


@pytest.fixture(scope="function")
def auth_headers(client: TestClient) -> dict[str, str]:
    """
    Register a user and return JWT authorization headers.
    """

    register_response = client.post(
        "/api/auth/register",
        json={
            "email": "test@example.com",
            "password": "secret123",
            "name": "Test User",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        data={
            "username": "test@example.com",
            "password": "secret123",
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    return {
        "Authorization": f"Bearer {token}",
    }