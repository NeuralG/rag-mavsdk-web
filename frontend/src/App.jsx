import ReactMarkdown from "react-markdown"
import "./styles.css"
import { useState, useEffect } from "react"

const API_URL = "http://127.0.0.1:5000"

function App() {
	const [messages, setMessages] = useState([])
	const [query, setQuery] = useState("")
	const [loading, setLoading] = useState(false)

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
					oldMessages: updatedMessages.slice(-5),
				}),
				headers: { "Content-Type": "application/json" },
			})
			if (!result.ok) throw new Error("Request failed")

			const data = await result.json()
			setMessages((prev) => [...prev, { role: "ai", text: data.answer }])
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<main>
			<ResultArea messages={messages} loading={loading} />
			<MyForm
				query={query}
				setQuery={setQuery}
				handleSubmit={handleSubmit}
			/>
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

function ResultArea({ messages, loading }) {
	return (
		<div className="text-body">
			{messages.length > 0 ? (
				messages.map((m, i) => (
					<ResultText
						key={i}
						isUser={m.role === "user"}
						text={m.text}
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

export default App
