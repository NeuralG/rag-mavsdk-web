import ReactMarkdown from "react-markdown"

function ResultText({ isUser, text }) {
	return (
		<div className={`markdown-body ${isUser ? "user-text" : "ai-text"}`}>
			<ReactMarkdown>{text}</ReactMarkdown>
		</div>
	)
}

export default ResultText
