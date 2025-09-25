from flask import Flask, request, jsonify
from backend.LLM_RAG.askToLLM import askLLM
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow all origins (for dev)


@app.route("/", methods=["POST"])
def query():
    data = request.get_json()
    question = data["question"]
    oldMessages = data["oldMessages"]

    answer = askLLM(question, oldMessages, 10)

    return jsonify({"question": question, "answer": answer})
