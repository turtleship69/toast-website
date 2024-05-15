import os

def generate_netlify_toml():
    #define url rewrite rules
    netlify = f"""[[redirects]] 
    from = "/raw-images/*" 
    to = "{os.environ["BACKEND_URL"]}/images/:splat" 
    status = 200 
    force = true

    [[redirects]]
    from = "/images/*"
    to = "/.netlify/images?url=/raw-images/:splat&w=1080&h=1080&q=50&fit=cover"
    status = 200

    [[redirects]] 
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
    from = "/pfp/*" 
    to = "{os.environ["BACKEND_URL"]}/pfp/:splat" 
    status = 200 
    force = true

    [[redirects]] 
    from = "/notifications/*" 
    to = "{os.environ["BACKEND_URL"]}/notifications/:splat" 
    status = 200 
    force = true

    [[redirects]] 
    from = "/sitemap.xml*" 
    to = "{os.environ["BACKEND_URL"]}/sitemap.xml" 
    status = 200 
    force = true"""

    with open("netlify.toml", 'w') as f:
        f.write(netlify)