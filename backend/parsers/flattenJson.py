import json


def run():
    with open("backend/jsons/all_plugins.json", "r", encoding="utf-8") as f:
        plugins = json.load(f)

    methods = []
    for plugin in plugins:
        for m in plugin["methods"]:
            methods.append(
                {
                    "plugin": plugin["plugin"],
                    "signature": m["signature"],
                    "doc": m["doc"],
                }
            )

    with open("backend/jsons/all_methods.json", "w", encoding="utf-8") as f:
        json.dump(methods, f, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    run()
