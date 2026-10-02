import re
from pathlib import Path

STYLES = (Path(__file__).resolve().parent.parent / "app" / "static" / "styles.css").read_text()


def get_css_rules(selector_pattern):
    """Return the bodies of every CSS rule whose selector matches the pattern."""
    return re.findall(rf"(?m)^({selector_pattern})\s*\{{([^}}]*)\}}", STYLES)


def test_quick_action_cards_are_not_rotated_or_offset():
    rules = get_css_rules(r"\.action-card[^{]*")
    assert rules, "expected .action-card rules in styles.css"
    for selector, body in rules:
        if ":hover" in selector:
            continue
        assert not re.search(r"transform\s*:", body), f"{selector} must not transform cards"
        assert "nth-child" not in selector, f"{selector} must not style individual cards"


def test_quick_actions_row_wraps_without_extra_spacing():
    [(_, body)] = get_css_rules(r"\.quick-actions")
    assert re.search(r"display\s*:\s*flex", body)
    assert re.search(r"flex-wrap\s*:\s*wrap", body)
    margin = re.search(r"margin-bottom\s*:\s*(\d+)px", body)
    assert margin and int(margin.group(1)) <= 40


def test_dashboard_renders_all_quick_actions(client):
    text = client.get("/").get_data(as_text=True)
    assert text.count('class="action-card"') == 4
    for href in ("/transfer", "/pay-bill", "/api/statements", "/api/fx"):
        assert f'href="{href}" class="action-btn"' in text
