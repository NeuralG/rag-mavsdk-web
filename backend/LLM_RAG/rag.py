from sentence_transformers import SentenceTransformer
import json
import chromadb
import uuid

# fetch my methods json
chunkFile = "backend/jsons/all_methods_chunks.json"
with open(chunkFile, "r", encoding="utf-8") as f:
    chunks = json.load(f)

# extract id and texts
ids = [f"{c['signature']}_{str(uuid.uuid4())}" for c in chunks]
texts = [c["text"] for c in chunks]

# extract metadatas
metadatas = []
for c in chunks:
    entry = {
        "plugin": c["plugin"],
        "signature": c["signature"],
        "chunk_id": c["chunk_id"],
    }
    metadatas.append(entry)


# initialise model for embedddings
model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode(texts, show_progress_bar=True).tolist()

# initialise vectordb
chromaClient = chromadb.PersistentClient(path="./chroma_store")
collection = chromaClient.get_or_create_collection("drone_docs")

collection.add(ids=ids, embeddings=embeddings, documents=texts, metadatas=metadatas)

# now we have the collection


def queryToCollection(query, nResults=3):
    """
    gets n amount of UNIQUE queries and passes them to merge function
    """
    embedding = model.encode([query]).tolist()
    results = collection.query(
        query_embeddings=embedding,
        n_results=nResults,
    )

    # set to make sure that signatures are not dupe
    signatures = list(set(meta["signature"] for meta in results["metadatas"][0]))

    return signaturesToDocs(signatures)


def signaturesToDocs(signatures):
    """
    creates unchunked docs given the signature list
    """

    fullDocs = {}
    for sig in signatures:
        results = collection.get(where={"signature": sig})

        parts = sorted(
            zip(results["metadatas"], results["documents"]),
            key=lambda x: x[0]["chunk_id"],  # x[0]["chunk_id"] = metadata -> chunkid
        )

        merged = " ".join(doc for _, doc in parts)

        fullDocs[sig] = merged

    return fullDocs


def docsToContext(docsDict):
    """Converts docs"""
    context = ""
    for sig, doc in docsDict.items():
        context += f"[Function: {sig}]\n{doc}\n\n"
    return context


def ragRetrieve(query, nResults=3):
    return docsToContext(queryToCollection(query, nResults))
