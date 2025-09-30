function MyForm({ query, setQuery, handleSubmit }) {
	return (
		<div className="form-container">
			<button>Options</button>
			{/* TODO: Replace this with an icon.
				TODO: Make it functional 
			*/}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Enter drone question..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button type="submit">Submit!</button>
			</form>
		</div>
	)
}

export default MyForm
