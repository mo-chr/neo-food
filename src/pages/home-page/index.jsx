import React, { useState } from "react";
import "./style.scss";
import NavBar from "../../components/navbar/navbar";
import WheelComponent from "../../components/spinning-wheel/wheel";

const HomePage = () => {
	const [isUserLogged, setUserLogged] = useState(false);
	const [userRole, setUserRole] = useState("");

	return (
		<div className="home-page">
			<NavBar
				isUserLogged={isUserLogged}
				setUserLogged={setUserLogged}
				userRole={userRole}
				setUserRole={setUserRole}
			/>
			<WheelComponent isUserLogged={isUserLogged} />
		</div>
	);
};

export default HomePage;
