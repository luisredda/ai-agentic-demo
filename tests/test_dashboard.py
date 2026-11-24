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


def _extract_csrf_token(html):
    marker = 'name="csrf_token" value="'
    start = html.index(marker) + len(marker)
    return html[start:html.index('"', start)]


def test_login_returns_200(client):
    res = client.get("/login")
    assert res.status_code == 200
    assert 'name="csrf_token"' in res.get_data(as_text=True)


def test_login_post_without_csrf_token_is_rejected(client):
    client.get("/login")
    res = client.post("/login", data={"username": "u", "password": "p"})
    assert res.status_code == 400


def test_login_post_with_wrong_csrf_token_is_rejected(client):
    client.get("/login")
    res = client.post(
        "/login", data={"username": "u", "password": "p", "csrf_token": "bogus"}
    )
    assert res.status_code == 400


def test_login_post_without_session_is_rejected(client):
    res = client.post("/login", data={"username": "u", "password": "p"})
    assert res.status_code == 400


def test_login_post_with_valid_csrf_token_redirects(client):
    token = _extract_csrf_token(client.get("/login").get_data(as_text=True))
    res = client.post(
        "/login", data={"username": "u", "password": "p", "csrf_token": token}
    )
    assert res.status_code == 302
    assert res.headers["Location"].endswith("/")
