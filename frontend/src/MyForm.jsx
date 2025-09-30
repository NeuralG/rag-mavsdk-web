import { FiSettings } from "react-icons/fi"

function MyForm({ query, setQuery, setIsOptionsHidden, handleSubmit }) {
	return (
		<form className="form-container" onSubmit={handleSubmit}>
			<button onClick={() => setIsOptionsHidden(false)}>
				<FiSettings style={{ fontSize: "20px" }} />
			</button>
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

export default MyForm
