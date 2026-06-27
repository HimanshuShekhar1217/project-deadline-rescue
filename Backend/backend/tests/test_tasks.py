def test_create_list_update_and_delete_task(client, auth_headers):
    created = client.post(
        "/api/tasks",
        headers=auth_headers,
        json={"title": "Ship backend", "priority": "high"},
    )
    assert created.status_code == 201
    task_id = created.json()["id"]

    listed = client.get("/api/tasks", headers=auth_headers)
    assert listed.status_code == 200
    assert listed.json()[0]["title"] == "Ship backend"

    updated = client.patch(
        f"/api/tasks/{task_id}",
        headers=auth_headers,
        json={"status": "completed", "completed_percent": 100},
    )
    assert updated.status_code == 200
    assert updated.json()["status"] == "completed"

    deleted = client.delete(f"/api/tasks/{task_id}", headers=auth_headers)
    assert deleted.status_code == 204
