from bs4 import BeautifulSoup
import requests
import re
import json
import os


def run():
    # offical api python, fetch directly plugins
    url = "http://mavsdk-python-docs.s3-website.eu-central-1.amazonaws.com/plugins/index.html"
    response = requests.get(url)

    soup = BeautifulSoup(response.text, "html.parser")
    links = soup.find_all("a", class_="reference internal")

    pluginLinks = []
    base = "http://mavsdk-python-docs.s3-website.eu-central-1.amazonaws.com/plugins/"

    for link in links:
        href = link.get("href")
        if not href:
            continue  # if empty

        title = href.split(".")[0]  # take the part before .html

        fullUrl = base + href
        pluginLinks.append((title, fullUrl))

    ### NOW WE EXTRACTED ALL PLUGIN LINKS

    def formatText(text):
        # taken from chatgpt directly
        if not text:
            return ""
        text = text.replace("Â¶", "").replace("â\x80\x93", "-")
        text = text.replace("â\x80\x9c", '"').replace("â\x80\x9d", '"')
        text = text.replace("â\x80\x98", "'").replace("â\x80\x99", "'")
        text = re.sub(r"\s+", " ", text)
        return text.strip()

    def makePluginHashMap(title, link):
        response = requests.get(link)
        soup = BeautifulSoup(response.text, "html.parser")
        dls = soup.find_all("dl", class_="py method")

        methods = []

        for dl in dls:
            dt = dl.find("dt")
            dd = dl.find("dd")
            if dt:
                signature = formatText(dt.get_text(" ", strip=True))
                explanation = formatText(dd.get_text(" ", strip=True)) if dd else ""
                methods.append({"signature": signature, "doc": explanation})

        return {"plugin": title, "methods": methods}

    allPlugins = [
        makePluginHashMap(title, pluginUrl) for title, pluginUrl in pluginLinks
    ]

    ### NOW WE EXTRACTED ALL PLUGINS, TIME TO MAKE IT A JSON
    os.makedirs("backend/jsons", exist_ok=True)
    with open("backend/jsons/all_plugins.json", "w", encoding="utf-8") as f:
        json.dump(allPlugins, f, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    run()
