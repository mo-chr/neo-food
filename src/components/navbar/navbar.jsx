import React, { useEffect, useState, useCallback } from "react";
import "./navbar.scss";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import NeoLogo from "../../assets/neo-logo-white.svg";
import { onAuthStateChanged } from "firebase/auth";
import AddRestaurantModal from "../modals/add-restaurant-modal";
import { ref, set, getDatabase, get } from "firebase/database";

function NavBar({ isUserLogged, setUserLogged, userRole, setUserRole }) {
	const [isRestaurantModalOpen, setRestaurantModalOpen] = useState(false);

	const getUserRole = useCallback(
		async (user) => {
			const database = getDatabase();
			const userRef = ref(database, `users/${user.uid}`);
			const userSnapshot = await get(userRef);

			if (!userSnapshot.exists()) {
				set(userRef, {
					username: user.displayName,
					email: user.email,
					role: "user",
				});
				setUserRole("User");
			} else {
				const role = userSnapshot.val().role;
				setUserRole(role.charAt(0).toUpperCase() + role.slice(1));
			}
		},
		[setUserRole]
	);

	const signInWithGoogle = useCallback(async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			if (result && result.user) {
				const user = result.user;
				getUserRole(user);
				setUserLogged(true);
			} else {
				console.error("No user information found.");
			}
		} catch (err) {
			console.error(err);
		}
	}, [getUserRole, setUserLogged]);

	useEffect(() => {
		const handleAuthStateChanged = (user) => {
			if (user) {
				getUserRole(user);
				setUserLogged(true);
			} else {
				setUserLogged(false);
			}
		};

		onAuthStateChanged(auth, handleAuthStateChanged);
	}, [getUserRole, setUserLogged]);

	const onLogOut = useCallback(async () => {
		try {
			await signOut(auth);
			setUserLogged(false);
			setUserRole("");
		} catch (err) {
			console.error(err);
		}
	}, [setUserLogged, setUserRole]);

	const onModalCloseClick = useCallback(() => {
		setRestaurantModalOpen(false);
	}, []);

	const onAddRestaurantClick = useCallback(() => {
		console.log("CLICK");
		setRestaurantModalOpen(true);
	}, []);

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
				<h3 className="title-nav"> {userRole}</h3>
			</div>
			<div className="nav-item button-holder">
				{isUserLogged ? (
					<>
						<button className="btn logout-btn" onClick={onLogOut}>
							Logout
						</button>
						{userRole === "Admin" && (
							<button
								className="btn restaurant-btn"
								onClick={onAddRestaurantClick}
							>
								Add Restaurant
							</button>
						)}
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
