from langchain_text_splitters import RecursiveCharacterTextSplitter
import json


def run():

    with open("backend/jsons/all_methods.json", "r", encoding="utf-8") as f:
        methods = json.load(f)

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=300,
        chunk_overlap=50,
        separators=["\n\n", "\n", ". ", " ", ""],
    )

    chunkedMethods = []

    for m in methods:
        text = f"{m['plugin']} | {m['signature']} | {m['doc']}"
        chunks = splitter.split_text(text)
        for i, chunk in enumerate(chunks):
            chunkedMethods.append(
                {
                    "plugin": m["plugin"],
                    "signature": m["signature"],
                    "chunk_id": i,
                    "text": chunk,
                }
            )

    with open("backend/jsons/all_methods_chunks.json", "w", encoding="utf-8") as f:
        json.dump(chunkedMethods, f, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    run()
