import SwitchHistoryAmount from "./SwitchHistoryAmount"
import SwitchMode from "./SwitchMode"

function Options({ isHidden, isUsingRAG, setIsUsingRAG, lastN, setLastN }) {
	if (isHidden) return

	return (
		<div className="options-container">
			<SwitchMode isUsingRAG={isUsingRAG} setIsUsingRAG={setIsUsingRAG} />
			<SwitchHistoryAmount lastN={lastN} setLastN={setLastN} />
		</div>
	)
}

export default Options
