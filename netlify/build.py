#!/usr/bin/env python
import compile, hanko, rewrites

compile.compile()

hanko.save_config()

rewrites.generate_netlify_toml()