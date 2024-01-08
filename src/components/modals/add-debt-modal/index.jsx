import React, { useState, useEffect } from "react";
import { ref, getDatabase, get, set } from "firebase/database";
import "firebase/auth";
import "./style.scss";

const DebtModal = ({ onDebtModalClose }) => {
	const [setLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const [selectedDebtorUUID, setSelectedDebtorUUID] = useState("");
	const [selectedCreditorUUID, setSelectedCreditorUUID] = useState("");
	const [selectedCurrency, setSelectedCurrency] = useState("");
	const [value, setValue] = useState("");
	const creationDate = new Date().toISOString().replace(/[-.:#]/g, "");
	const idRandomNumber = Math.floor(Math.random() * 1000000);

	const fetchUsers = async () => {
		try {
			const databaseRef = ref(getDatabase(), "users");
			const snapshot = await get(databaseRef);
			const userData = snapshot.val();

			if (userData) {
				const userArray = Object.values(userData);
				setUsers(userArray);
			}

			setLoading(false);
		} catch (error) {
			console.error("Error fetching users from Firebase:", error);
			setLoading(false);
		}
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		fetchUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleDebtorChange = (e) => {
		const selectedDebtorUUID = e.target.value;
		setSelectedDebtorUUID(selectedDebtorUUID);
	};

	const handleCreditorChange = (e) => {
		const selectedCreditorUUID = e.target.value;
		setSelectedCreditorUUID(selectedCreditorUUID);
	};

	const handleSubmit = async () => {
		if (selectedDebtorUUID === selectedCreditorUUID) {
			alert("Debtor and Creditor must be different");
			return;
		}
		const debtId = `${creationDate}${idRandomNumber}`;
		const debtsRef = ref(getDatabase(), `debts/${debtId}`);
		const newDebt = {
			debtuid: debtId,
			debitorUUID: selectedDebtorUUID,
			debitorUsername: users.find((user) => user.uid === selectedDebtorUUID)
				.username,
			creditorUUID: selectedCreditorUUID,
			creditorUsername: users.find((user) => user.uid === selectedCreditorUUID)
				.username,
			creationDate: new Date().toISOString(),
			value: parseFloat(value),
			currency: selectedCurrency,
		};

		await set(debtsRef, newDebt);

		onDebtModalClose();
	};

	return (
		<div className="add-debt-modal">
			<div className="modal-box">
				<button className="close-btn" onClick={onDebtModalClose}>
					X
				</button>
				<div className="modal-content">
					<div className="modal-row">
						<label>Debtor (who is in debt)</label>
						<select
							id="select-debtor"
							className="custom-select"
							defaultValue={selectedDebtorUUID}
							onChange={handleDebtorChange}
						>
							<option value="" disabled>
								Select a Debtor
							</option>
							{users
								.filter((user) => user.uid !== selectedCreditorUUID)
								.map((user) => (
									<option
										value={user.uid}
									>{`${user.username} (${user.email})`}</option>
								))}
						</select>
					</div>
					<div className="modal-row">
						<label>Creditor</label>
						<select
							id="select-creditor"
							className="custom-select"
							defaultValue={selectedCreditorUUID}
							onChange={handleCreditorChange}
						>
							<option value="" disabled>
								Select a Creditor
							</option>
							{users
								.filter((user) => user.uid !== selectedDebtorUUID)
								.map((user) => (
									<option value={user.uid}>
										{`${user.username} (${user.email})`}
									</option>
								))}
						</select>
					</div>
					<div className="modal-row">
						<label>Value</label>
						<input
							type="number"
							className="customInput"
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
					</div>
					<div className="modal-row">
						<label>Currency</label>
						<select
							id="select-currency"
							className="custom-select"
							value={selectedCurrency}
							onChange={(e) => setSelectedCurrency(e.target.value)}
						>
							<option value="" disabled>
								Select a Currency
							</option>
							<option value="$">USD</option>
							<option value="LBP">LBP</option>
						</select>
					</div>
				</div>
				<div className="modal-footer">
					<button onClick={handleSubmit}>Submit</button>
				</div>
			</div>
		</div>
	);
};

export default DebtModal;
