import React from "react";
import "./NavBar.scss";
import NeoLogo from "../../assets/neo-logo-white.svg";
function NavBar() {
	return (
		<div className="NavBar">
			<div className="nav-item">
				<a href="https://neo.ae/">
					<img className="Logo" src={NeoLogo} alt="Neo Mena's Logo" />
				</a>
			</div>
			<div className="nav-item">
				<h3 className="title-nav">Neo Food Picker</h3>
			</div>
			<div className="nav-item">
				<button className="login-btn"> Login </button>
			</div>
		</div>
	);
}

export default NavBar;
