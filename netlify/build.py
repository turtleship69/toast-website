#!/usr/bin/env python
import os
import compile, hanko, rewrites, canonical

compile.compile()

hanko.save_config()

if os.environ.get('NETLIFY'):
    rewrites.generate_netlify_toml()
    canonical.addTags()