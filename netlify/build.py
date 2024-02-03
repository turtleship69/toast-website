#!/usr/bin/env python
import json
import os
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

        with open(f"config/{self.filename}.json", 'w') as f:
            json.dump(config, f)


hanko = Config("hanko")
# get HANKO_URL and save it as url
hanko.add_variable("url", os.environ["HANKO_URL"])
hanko.save()

servers = Config("servers")
servers.add_variable("frontend", os.environ["URL"])
servers.add_variable("backend", os.environ["BACKEND_URL"])
servers.save()
