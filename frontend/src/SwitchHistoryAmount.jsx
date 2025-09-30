function SwitchHistoryAmount({ lastN, setLastN }) {
	const options = [
		{ label: "None", value: 0 },
		{ label: "1", value: 1 },
		{ label: "2", value: 2 },
		{ label: "5", value: 5 },
	]
	return (
		<div className="history-container">
			<p>Select last N messages</p>
			{options.map(({ label, value }) => (
				<label key={value}>
					{label}:
					<input
						type="radio"
						name="lastN"
						value={value}
						checked={lastN === value}
						onChange={(e) => setLastN(Number(e.target.value))}
					/>
				</label>
			))}
		</div>
	)
}

export default SwitchHistoryAmount
