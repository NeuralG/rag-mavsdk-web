import "./styles.css"
import { useState, useEffect } from "react"

import MyForm from "./MyForm"
import Options from "./Options"
import ResultArea from "./ResultArea"

const API_URL = "http://127.0.0.1:5000"
const LAST_N_MESSAGES = 5

function App() {
	const [messages, setMessages] = useState([])
	const [query, setQuery] = useState("")
	const [loading, setLoading] = useState(false)
	const [isUsingRAG, setIsUsingRAG] = useState(true)
	const [lastN, setLastN] = useState(2)
	const [isOptionsHidden, setIsOptionsHidden] = useState(false)

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
			<Options
				isHidden={isOptionsHidden}
				isUsingRAG={isUsingRAG}
				setIsUsingRAG={setIsUsingRAG}
				lastN={lastN}
				setLastN={setLastN}
			/>
		</main>
	)
}

export default App
