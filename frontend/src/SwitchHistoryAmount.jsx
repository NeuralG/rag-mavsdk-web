function SwitchHistoryAmount({ lastN, setLastN }) {
	return (
		<div className="history-container">
			<label>
				None:
				<input
					type="radio"
					name="lastN"
					value={0}
					checked={lastN == 0}
					onChange={(e) => setLastN(e.target.value)}
				/>
			</label>
			<label>
				1:
				<input
					type="radio"
					name="lastN"
					value={1}
					checked={lastN == 1}
					onChange={(e) => setLastN(e.target.value)}
				/>
			</label>
			<label>
				2:
				<input
					type="radio"
					name="lastN"
					value={2}
					checked={lastN == 2}
					onChange={(e) => setLastN(e.target.value)}
				/>
			</label>
			<label>
				5:
				<input
					type="radio"
					name="lastN"
					value={5}
					checked={lastN == 5}
					onChange={(e) => setLastN(e.target.value)}
				/>
			</label>
		</div>
	)
}

export default SwitchHistoryAmount
