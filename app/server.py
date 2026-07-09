import os

from .app import create_app
from .config import config
from .db import init_db

init_db()
app = create_app()


def main():
    host = os.environ.get("FLASK_HOST", "127.0.0.1")
    print(f"DemoBank AI SDLC running on http://localhost:{config['port']}")
    print("WARNING: This app is intentionally vulnerable. DEMO USE ONLY.")
    app.run(host=host, port=config["port"])


if __name__ == "__main__":
    main()
