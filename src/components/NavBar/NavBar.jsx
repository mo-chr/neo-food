import React from "react";
import "./NavBar.scss";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

import NeoLogo from "../../assets/neo-logo-white.svg";
function NavBar() {
	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (err) {
			console.error(err);
		}
	};

	const logOut = async () => {
		try {
			await signOut(auth);
		} catch (err) {
			console.error(err);
		}
	};
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
				<button className="login-btn" onClick={signInWithGoogle}>
					Login
				</button>
			</div>
		</div>
	);
}

export default NavBar;
