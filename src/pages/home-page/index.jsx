import React from "react";
import "./style.scss";
import NavBar from "../../components/navbar/navbar";
import WheelComponent from "../../components/spinning-wheel/wheel";

const HomePage = () => {
	return (
		<div className="home-page">
			<NavBar />
			<WheelComponent />
		</div>
	);
};

export default HomePage;
