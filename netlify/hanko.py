import os, json

def save_config():
    with open(f"config/hanko.js", 'w') as f:
        config = {
            'url': os.environ['HANKO_URL']
        }
        f.write(f"const hanko_config = {json.dumps({config}, indent=4)}")