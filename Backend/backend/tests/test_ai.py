def test_ai_recommendation_requires_auth_and_returns_plan(
    client,
    auth_headers,
):
    """Test AI recommendation endpoint."""

    # Endpoint should require authentication
    response = client.post("/api/ai/recommend")
    assert response.status_code == 401

    # Authenticated request
    response = client.post(
        "/api/ai/recommend",
        headers=auth_headers,
    )

    assert response.status_code == 200

    body = response.json()

    assert body["summary"]
    assert body["type"] == "rescue_plan"
    assert isinstance(body["steps"], list)
    assert len(body["steps"]) > 0
    assert isinstance(body["confidence_score"], float)