#!/usr/bin/env python
import json
import os
from jinja2 import Environment, FileSystemLoader
"""this file gets the environment variables and saves them to config files"""

class Config():
    def __init__(self, filename: str) -> None:
        self.filename = filename
        self.variables = []

    def add_variable(self, name: str, value: str) -> None:
        self.variables.append([name, value])

    def save(self: str) -> None:
        #open self.filename and write the variables to it
        config = {}
        for item in self.variables:
            config[item[0]] = item[1]

        with open(f"config/{self.filename}.js", 'w') as f:
            f.write(f"const {self.filename}_config = {json.dumps(config, indent=4)}")


hanko = Config("hanko")
# get HANKO_URL and save it as url
hanko.add_variable("url", os.environ["HANKO_URL"])
hanko.save()

# servers = Config("servers")
# servers.add_variable("frontend", os.environ["URL"])
# servers.add_variable("backend", os.environ["BACKEND_URL"])
# servers.save()


#define url rewrite rules
netlify = f"""[[redirects]] 
from = "/hanko/*" 
to = "{os.environ["BACKEND_URL"]}/hanko/:splat" 
status = 200 
force = true

[[redirects]] 
from = "/get_posts/*" 
to = "{os.environ["BACKEND_URL"]}/get_posts/:splat" 
status = 200 
force = true

[[redirects]] 
from = "/new_post/*" 
to = "{os.environ["BACKEND_URL"]}/new_post/:splat" 
status = 200 
force = true

[[redirects]] 
from = "/friendships/*" 
to = "{os.environ["BACKEND_URL"]}/friendships/:splat" 
status = 200 
force = true

[[redirects]] 
from = "/images/*" 
to = "{os.environ["BACKEND_URL"]}/images/:splat" 
status = 200 
force = true"""

with open("netlify.toml", 'w') as f:
    f.write(netlify)






folders = ["post/", "settings/auth/", "submit/", "user/", ""]

# for each folder, look for index.html.jinja, compile it and delete the original
for folder in folders:
    env = Environment(loader=FileSystemLoader(['templates', folder]))
    template = env.get_template("index.html.jinja")
    output = template.render()
    #print(folder + "index.html")
    with open(folder + "index.html", "w") as f:
        f.write(output)
    if os.getenv("NETLIFY") == "true":
        os.remove(folder + "/index.html.jinja")
    print("Done compiling " + folder)


print("Done compiling website")