import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import NeoLogo from "../../assets/neo-logo-white.svg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AddRestaurantModal from "../modals/add-restaurant-modal";

function NavBar() {
	const [isUserLogged, setUserLogged] = useState(false);
	const [isRestaurantModalOpen, setRestaurantModalOpen] = useState(false);

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				setUserLogged(true);
			} else {
				setUserLogged(false);
			}
		});
	}, [isUserLogged]);

	const onLogOut = async () => {
		try {
			await signOut(auth);
			setUserLogged(false);
		} catch (err) {
			console.error(err);
		}
	};
	const onModalCloseClick = () => {
		setRestaurantModalOpen(false);
	};

	const onAddRestaurantClick = () => {
		console.log("CLICK");
		setRestaurantModalOpen(true);
	};
	return (
		<div className="navbar">
			{isRestaurantModalOpen ? (
				<AddRestaurantModal onCloseClick={onModalCloseClick} />
			) : (
				""
			)}
			<div className="nav-item">
				<a href="https://neo.ae/">
					<img className="Logo" src={NeoLogo} alt="Neo Mena's Logo" />
				</a>
			</div>
			<div className="nav-item">
				<h3 className="title-nav">Neo Food Picker</h3>
			</div>
			<div className="nav-item button-holder">
				{isUserLogged ? (
					<>
						<button className="btn logout-btn" onClick={onLogOut}>
							Logout
						</button>
						<button
							className="btn restaurant-btn"
							onClick={onAddRestaurantClick}
						>
							Add Restaurant
						</button>
					</>
				) : (
					<button className="btn login-btn" onClick={signInWithGoogle}>
						Login
					</button>
				)}
			</div>
		</div>
	);
}

export default NavBar;
