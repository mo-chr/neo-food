import React, { useState } from "react";
import "./style.scss";
import NavBar from "../../components/navbar/navbar";
import WheelComponent from "../../components/spinning-wheel/wheel";

const HomePage = () => {
	const [isUserLogged, setUserLogged] = useState(false);
	const [userRole, setUserRole] = useState("");
	const [triggerReload, setTriggerReload] = useState(false);

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
				<WheelComponent
					isUserLogged={isUserLogged}
					triggerReload={triggerReload}
					setTriggerReload={setTriggerReload}
				/>
			</div>
		</>
	);
};

export default HomePage;
