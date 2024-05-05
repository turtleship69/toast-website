import os, json

def save_config():
    with open(f"config/hanko.js", 'w') as f:
        f.write(f"const hanko_config = {json.dumps({'url', os.environ['HANKO_URL']}, indent=4)}")