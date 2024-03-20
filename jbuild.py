from jinja2 import Environment, FileSystemLoader
import os


folders = ["post/", "settings/", "submit/", "user/", ""]


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


print("Finish")