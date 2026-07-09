import re


def test_post_transfers_accepts_valid_demo_transfer(client):
    res = client.post(
        "/api/transfers/",
        json={"fromAccount": "DEMO-001", "toAccount": "DEMO-002", "amount": 100, "memo": "Test"},
    )
    assert res.status_code == 200
    body = res.get_json()
    assert body["success"] is True
    assert re.search(r"completed", body["message"], re.IGNORECASE)


def test_post_transfers_returns_400_when_fields_missing(client):
    res = client.post("/api/transfers/", json={"fromAccount": "DEMO-001"})
    assert res.status_code == 400
