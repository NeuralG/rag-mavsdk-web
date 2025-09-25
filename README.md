# rag-mavsdk-web

A Retrieval-augmented generation(RAG) chatbot for asking questions about mavsdk-python.

## Installation

1. Clone the repo:

```bash
git clone https://github.com/NeuralG/rag-mavsdk-web
cd rag-mavsdk-web
```

2. Create a env:

```bash
#You can use your editor for this step too.
python3 -m venv .venv
source .venv/bin/activate
```

3. Install backend dependencies:

```bash
pip install --index-url https://download.pytorch.org/whl/cpu
pip install -r requirements.txt
```

4. Prepare vector database:

```bash
python backend/prepare.py
```

5. [Obtain a gemini api key](https://aistudio.google.com/api-keys)

6. Create a .env file on root and put the key inside

```env
GEMINI_API_KEY=<YOUR_API_KEY>
```

7. Run the backend:

```bash
flask run
```

8. Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

## Usage

After all the steps on installation, open the app in browser.
Example questions:

-   How do I arm the drone?
-   How can I upload a mission?
