"""
this module modifies the html structure of pages and added a canonical meta tag
"""

import os

from bs4 import BeautifulSoup

def add_canon_tag(file:str, link: str) -> None:
    """
    modify the html structure of pages and add a canonical meta tag using bs4 to the end of the head
    :param file: the file to modify
    :param link: the canonical link to add
    :return: None
    """
    # Read the HTML file
    with open(file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Parse the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')

    # Create a new meta tag for canonical link
    canonical_tag = soup.new_tag('link', rel='canonical', href=link)

    # Find the head section and append the canonical tag
    head_tag = soup.find('head')
    head_tag.append(canonical_tag)

    # Write the modified HTML back to the file
    with open(file, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print(f"added canonical tag to {file}")



def addTags(BASE_URL=None):
    if not BASE_URL:
        BASE_URL = os.environ["URL"]
    pages = [
        ["index.html", BASE_URL], 
        ["login/index.html", f"{BASE_URL}/login"]]

    # iterate through pages and add canonical tag
    for page in pages:
        add_canon_tag(page[0], page[1])
