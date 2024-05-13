#!/usr/bin/env python
import os
import compile, hanko, rewrites, canonical

compile.compile()

if os.environ.get('NETLIFY'):
    hanko.save_config()
    rewrites.generate_netlify_toml()
    canonical.addTags()