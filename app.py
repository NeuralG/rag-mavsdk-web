from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.LLM_RAG.askToLLM import askLLM
from backend.LLM_RAG.askToLLM import askLLMnoRAG

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["POST"])
def query():
    data = request.get_json()
    question = data["question"]
    oldMessages = data["oldMessages"]

    answerWithRAG = askLLM(question, oldMessages, 10)
    answerWithoutRAG = askLLMnoRAG(question, oldMessages)

    return jsonify(
        {
            "question": question,
            "answerWithRAG": answerWithRAG,
            "answerWithoutRAG": answerWithoutRAG,
        }
    )
