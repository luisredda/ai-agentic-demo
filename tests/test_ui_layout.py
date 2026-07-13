import re
from pathlib import Path


STYLES = Path("app/static/styles.css").read_text()


def css_rule(selector):
    prefix = f"{selector} {{"
    start = STYLES.find(prefix)
    if start == -1:
        return ""
    body_start = start + len(prefix)
    body_end = STYLES.find("}", body_start)
    return STYLES[body_start:body_end]


def test_dashboard_quick_action_buttons_use_aligned_grid_layout():
    quick_actions = css_rule(".quick-actions")
    action_card = css_rule(".action-card")
    action_button = css_rule(".action-btn")

    assert "display: grid" in quick_actions
    assert "grid-template-columns: repeat(auto-fit, minmax(160px, 1fr))" in quick_actions
    assert "position: relative" not in quick_actions

    assert "display: flex" in action_card
    assert "flex-direction: column" in action_card
    assert "margin-top: auto" in action_button
    assert not re.search(r"\.action-card[^{]*\{[^}]*\btransform\s*:", STYLES)


def test_transfer_button_stays_inside_form_flow():
    form_actions = css_rule(".form-actions")

    assert "margin-top: 24px" in form_actions
    assert "display: flex" in form_actions
    assert "margin-left" not in form_actions
