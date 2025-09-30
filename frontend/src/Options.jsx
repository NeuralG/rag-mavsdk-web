import SwitchHistoryAmount from "./SwitchHistoryAmount"
import SwitchMode from "./SwitchMode"

import { FaTimes } from "react-icons/fa"

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
				<div className="upper-container">
					<SwitchMode
						isUsingRAG={isUsingRAG}
						setIsUsingRAG={setIsUsingRAG}
					/>
					<button
						className="close-options"
						onClick={() => setIsHidden(true)}
					>
						<FaTimes size={20} />
					</button>
				</div>

				<SwitchHistoryAmount lastN={lastN} setLastN={setLastN} />
			</div>
		</>
	)
}

export default Options
