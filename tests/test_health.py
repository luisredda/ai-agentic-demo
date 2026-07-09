def test_health_returns_200_and_status_ok(client):
    res = client.get("/health")
    assert res.status_code == 200
    assert res.get_json() == {"status": "ok"}
