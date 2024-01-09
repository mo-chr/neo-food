import React, { useState, useCallback } from "react";
import "./style.scss";
import NavBar from "../../components/navbar/navbar";
import WheelComponent from "../../components/spinning-wheel/wheel";
import TableComponent from "../../components/table";
import "firebase/database";
import { ref, getDatabase, get } from "firebase/database";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";

const HomePage = () => {
	const [isUserLogged, setUserLogged] = useState(false);
	const [userRole, setUserRole] = useState("");
	const [triggerReload, setTriggerReload] = useState(false);
	const [creditorTableData, setCreditorTableData] = useState([]);
	const [borrowerTableData, setBorrowerTableData] = useState([]);
	const [userUid, setUserUid] = useState("");

	const getUserUID = useCallback(async (user) => {
		const database = getDatabase();
		const userRef = ref(database, `users/${user.uid}`);
		try {
			const userSnapshot = await get(userRef);
			const uid = userSnapshot.val().uid;
			setUserUid(uid);
		} catch (error) {
			console.error("Error getting user data:", error);
		}
	}, []);
	const fetchDebtorTableData = async () => {
		try {
			const databaseRef = ref(getDatabase(), "debts");
			const snapshot = await get(databaseRef);
			const data = snapshot.val();
			const debtorRows = Object.values(data)
				.filter((item) => item.debitorUUID === userUid)
				.map((item) => {
					const formattedDate = new Date(
						item.creationDate
					).toLocaleDateString();
					return (
						<tr key={item.debtuid}>
							<td>{item.creditorUsername}</td>
							<td>{item.debitorUsername}</td>
							<td>{`${item.value} ${item.currency}`}</td>
							<td>{formattedDate}</td>
						</tr>
					);
				});
			setBorrowerTableData(debtorRows);
		} catch (error) {
			console.error("Error fetching debtor data:", error);
		}
	};

	const fetchCreditorTableData = async () => {
		try {
			const databaseRef = ref(getDatabase(), "debts");
			const snapshot = await get(databaseRef);
			const data = snapshot.val();
			const creditorRows = Object.values(data)
				.filter((item) => item.creditorUUID === userUid)
				.map((item) => {
					const formattedDate = new Date(
						item.creationDate
					).toLocaleDateString();
					return (
						<tr key={item.debtuid}>
							<td>{item.creditorUsername}</td>
							<td>{item.debitorUsername}</td>
							<td>{`${item.value} ${item.currency}`}</td>
							<td>{formattedDate}</td>
						</tr>
					);
				});
			setCreditorTableData(creditorRows);
		} catch (error) {
			console.error("Error fetching creditor data:", error);
		}
	};

	const lenderTableTitle = "Lender Table";
	const borrowerTableTitle = "Borrower Table";

	useEffect(() => {
		fetchDebtorTableData();
		console.log(creditorTableData);
	}, [userUid]);

	useEffect(() => {
		fetchCreditorTableData();
		console.log(borrowerTableData);
	}, [userUid]);

	useEffect(() => {
		const handleAuthStateChanged = (user) => {
			if (user) {
				getUserUID(user);
				setUserLogged(true);
			} else {
				setUserLogged(false);
			}
		};

		onAuthStateChanged(auth, handleAuthStateChanged);
	}, [getUserUID, setUserLogged]);

	return (
		<>
			<NavBar
				isUserLogged={isUserLogged}
				setUserLogged={setUserLogged}
				userRole={userRole}
				setUserRole={setUserRole}
				triggerReload={triggerReload}
				setTriggerReload={setTriggerReload}
			/>
			<div className="home-page">
				<div className="page-container">
					<div className="table-container">
						<TableComponent
							tableTitle={borrowerTableTitle}
							tableData={creditorTableData}
						/>
					</div>

					<WheelComponent
						isUserLogged={isUserLogged}
						triggerReload={triggerReload}
						setTriggerReload={setTriggerReload}
					/>
					<div className="table-container">
						<TableComponent
							tableTitle={lenderTableTitle}
							tableData={borrowerTableData}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;
