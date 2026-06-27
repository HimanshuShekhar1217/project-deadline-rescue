def test_register_login_and_me(client):
    response = client.post(
        "/api/auth/register",
        json={"email": "ada@example.com", "password": "secret123", "name": "Ada"},
    )
    assert response.status_code == 201
    assert response.json()["email"] == "ada@example.com"

    login = client.post(
        "/api/auth/login",
        data={"username": "ada@example.com", "password": "secret123"},
    )
    assert login.status_code == 200

    me = client.get("/api/auth/me", headers={"Authorization": f"Bearer {login.json()['access_token']}"})
    assert me.status_code == 200
    assert me.json()["name"] == "Ada"
