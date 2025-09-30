import ResultText from "./ResultText"

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

export default ResultArea
