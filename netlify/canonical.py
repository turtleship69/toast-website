"""
this module modifies the html structure of pages and added a canonical meta tag
"""
import os
import bs4

def addCanonTag(file:str, link: str) -> None:
    """
    modify the html structure of pages and add a canonical meta tag using bs4
    :param file: the file to modify
    :return: None
    """
    with open(file, 'r') as f:
        soup = bs4.BeautifulSoup(f, 'html.parser')
        soup.find('head').append(soup.new_tag('link', rel='canonical', href=link))
        with open(file, 'w') as f:
            f.write(str(soup))


def addTags():
    BASE_URL = os.environ['URL']
    pages = [
        ['/index.html', BASE_URL],
        ['/login/index.html', f"{BASE_URL}/login"]
    ]

    #iterate through pages and add canonical tag
    for page in pages:
        addCanonTag(page[0], page[1])