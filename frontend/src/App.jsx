import ReactMarkdown from "react-markdown"
import "./styles.css"
import { useState, useEffect } from "react"

const API_URL = "http://127.0.0.1:5000"
const LAST_N_MESSAGES = 5

function App() {
	const [messages, setMessages] = useState([])
	const [query, setQuery] = useState("")
	const [loading, setLoading] = useState(false)
	const [isUsingRAG, setIsUsingRAG] = useState(true)

	useEffect(() => {
		document.title = "RAG Frontend Demo"
	}, [])

	async function handleSubmit(event) {
		event.preventDefault()
		const querySaved = query
		setQuery("")

		const updatedMessages = [
			...messages,
			{ role: "user", text: querySaved },
		]
		setLoading(true)
		setMessages(updatedMessages)

		try {
			const result = await fetch(API_URL, {
				method: "POST",
				body: JSON.stringify({
					question: querySaved,
					oldMessages: updatedMessages.slice(-LAST_N_MESSAGES),
				}),
				headers: { "Content-Type": "application/json" },
			})
			if (!result.ok) throw new Error("Request failed")

			const data = await result.json()
			const answerWithRAG = await data.answerWithRAG
			const answerWithoutRAG = await data.answerWithoutRAG

			setMessages((prev) => [
				...prev,
				{
					role: "ai",
					answerWithRAG: answerWithRAG,
					answerWithoutRAG: answerWithoutRAG,
				},
			])
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<main>
			<ResultArea
				messages={messages}
				loading={loading}
				isUsingRAG={isUsingRAG}
			/>
			<MyForm
				query={query}
				setQuery={setQuery}
				handleSubmit={handleSubmit}
			/>
			<SwitchMode isUsingRAG={isUsingRAG} setIsUsingRAG={setIsUsingRAG} />
		</main>
	)
}

function MyForm({ query, setQuery, handleSubmit }) {
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Enter drone question..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<button type="submit">Submit!</button>
		</form>
	)
}

function ResultArea({ messages, loading, isUsingRAG }) {
	function decideText(isAi, isUsingRAG, message) {
		if (isAi) {
			if (isUsingRAG) {
				return message.answerWithRAG
			} else {
				return message.answerWithoutRAG
			}
		} else {
			return message.text
		}
	}
	return (
		<div className="text-body">
			{messages.length > 0 ? (
				messages.map((message, index) => (
					<ResultText
						key={index}
						isUser={message.role === "user"}
						text={decideText(
							message.role == "ai",
							isUsingRAG,
							message
						)}
					/>
				))
			) : (
				<div className="empty-body">
					<h1>Ask a mavsdk question! </h1>
				</div>
			)}

			{loading && (
				<div className="markdown-body ai-text">
					<span className="thinking">Thinking</span>
				</div>
			)}
		</div>
	)
}

function ResultText({ isUser, text }) {
	return (
		<div className={`markdown-body ${isUser ? "user-text" : "ai-text"}`}>
			<ReactMarkdown>{text}</ReactMarkdown>
		</div>
	)
}

function SwitchMode({ isUsingRAG, setIsUsingRAG }) {
	return (
		<div>
			<label>
				Use RAG:
				<input
					type="checkbox"
					checked={isUsingRAG}
					onChange={() => setIsUsingRAG((prev) => !prev)}
				/>
			</label>
		</div>
	)
}
export default App
