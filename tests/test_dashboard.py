def test_dashboard_returns_200(client):
    res = client.get("/")
    assert res.status_code == 200


def test_transfer_page_returns_200(client):
    res = client.get("/transfer")
    assert res.status_code == 200


def test_dashboard_pay_bill_action_links_to_bill_payment_page(client):
    res = client.get("/")
    text = res.get_data(as_text=True)
    assert 'href="/pay-bill"' in text
    assert "Pay Bill" in text


def test_pay_bill_returns_200(client):
    res = client.get("/pay-bill")
    assert res.status_code == 200
    assert "Pay Bill" in res.get_data(as_text=True)


def test_login_returns_200(client):
    res = client.get("/login")
    assert res.status_code == 200


def test_action_cards_have_no_rotation_transforms():
    from pathlib import Path

    styles = (Path(__file__).resolve().parent.parent / "app/static/styles.css").read_text()
    assert "action-card:nth-child" not in styles
    assert "rotate(" not in styles.split(".action-card")[1].split(".action-icon")[0]
