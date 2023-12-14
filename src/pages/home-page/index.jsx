import React, { useState } from "react";
import "./style.scss";
import NavBar from "../../components/navbar/navbar";
import WheelComponent from "../../components/spinning-wheel/wheel";

const HomePage = () => {
	const [isUserLogged, setUserLogged] = useState(false);
	const [userRole, setUserRole] = useState("");
	const [triggerReload, setTriggerReload] = useState(false);

	return (
		<div className="home-page">
			<NavBar
				isUserLogged={isUserLogged}
				setUserLogged={setUserLogged}
				userRole={userRole}
				setUserRole={setUserRole}
				triggerReload={triggerReload}
				setTriggerReload={setTriggerReload}
			/>
			<WheelComponent
				isUserLogged={isUserLogged}
				triggerReload={triggerReload}
				setTriggerReload={setTriggerReload}
			/>
		</div>
	);
};

export default HomePage;
