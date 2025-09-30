function SwitchMode({ isUsingRAG, setIsUsingRAG }) {
	return (
		<div className="mode-container">
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

export default SwitchMode
