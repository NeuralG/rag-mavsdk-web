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

export default SwitchMode
