import os
import re


ROOT = os.path.dirname(os.path.dirname(__file__))


def _read_styles():
    with open(os.path.join(ROOT, "app/static/styles.css"), "r", encoding="utf-8") as f:
        return f.read()


def _css_rule(styles, selector):
    escaped = re.escape(selector)
    match = re.search(rf"{escaped}\s*\{{([^}}]*)\}}", styles)
    return match.group(1) if match else ""


def test_dashboard_quick_action_buttons_stay_aligned():
    styles = _read_styles()
    quick_actions = _css_rule(styles, ".quick-actions")
    action_card = _css_rule(styles, ".action-card")
    action_button = _css_rule(styles, ".action-btn")

    assert "display: grid" in quick_actions
    assert "grid-template-columns: repeat(auto-fit" in quick_actions
    assert "display: flex" in action_card
    assert "flex-direction: column" in action_card
    assert "margin-top: auto" in action_button
    assert not re.search(r"\.action-card:nth-child\([^)]*\)\s*\{[^}]*transform\s*:", styles)


def test_form_action_button_stays_inside_form_card():
    styles = _read_styles()
    form_actions = _css_rule(styles, ".form-actions")

    assert "margin-top: 24px" in form_actions
    assert "display: flex" in form_actions
    assert not re.search(r"margin-left\s*:\s*[1-9]\d*px", form_actions)
