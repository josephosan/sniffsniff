#! ./venv/bin/python
import json
from core.capture import Capture


def run():
    with open("config/config.json", "r") as f:
        config = json.load(f)

    Capture(config)

if __name__ == '__main__':
    run()