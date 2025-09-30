import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from .rag import ragRetrieve

load_dotenv()
secret = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=secret)


def messageToHistory(oldMessages):
    formatted = []
    for m in oldMessages:
        if m.get("role") == "user":
            formatted.append(f"User:{m.get("text")}")
        else:
            formatted.append(f"AI: {m.get("answerWithRAG")}")

    return "\n".join(formatted)


def askLLM(query, oldMessages, nResults=3):
    context = ragRetrieve(query, nResults)
    history = messageToHistory(oldMessages)

    prompt = f"""
    You are a helpful assistant for a drone team. 
    Use the conversation history and the retrieved context to answer. 
    Always give a clear and detailed explanation. 
    Prioritize the retrieved context, but use history if retrieval is incomplete.

    Conversation history:
    {history}

    Retrieved context:
    {context}

    Question: {query}
    Answer:
    """

    print(history)
    response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
    return response.text


def askLLMnoRAG(query, oldMessages):
    history = messageToHistory(oldMessages)

    prompt = f"""
    Conversation history:
    {history}

    Question: {query}
    Answer:
    """

    response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
    return response.text
