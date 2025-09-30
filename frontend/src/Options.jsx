import SwitchHistoryAmount from "./SwitchHistoryAmount"
import SwitchMode from "./SwitchMode"

function Options({
	isHidden,
	setIsHidden,
	isUsingRAG,
	setIsUsingRAG,
	lastN,
	setLastN,
}) {
	if (isHidden) return null

	return (
		<>
			<div className="overlay" onClick={() => setIsHidden(true)}></div>
			<div className="options-container">
				<button
					className="close-options"
					onClick={() => setIsHidden(true)}
				>
					X
				</button>
				<SwitchMode
					isUsingRAG={isUsingRAG}
					setIsUsingRAG={setIsUsingRAG}
				/>
				<SwitchHistoryAmount lastN={lastN} setLastN={setLastN} />
			</div>
		</>
	)
}

export default Options
