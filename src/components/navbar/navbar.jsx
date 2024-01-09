import React, { useEffect, useState, useCallback } from "react";
import "./navbar.scss";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import NeoLogo from "../../assets/neo-logo-white.svg";
import { onAuthStateChanged } from "firebase/auth";
import AddRestaurantModal from "../modals/add-restaurant-modal";
import { ref, set, getDatabase, get } from "firebase/database";
import ProfileIcon from "../../assets/profile.png";
import HoverMenu from "../hover-menu";
import DebtModal from "../modals/add-debt-modal";

function NavBar({
	isUserLogged,
	setUserLogged,
	userRole,
	setUserRole,
	triggerReload,
	setTriggerReload,
}) {
	const [isRestaurantModalOpen, setRestaurantModalOpen] = useState(false);
	const [isProfileSubmenuOpen, setProfileSubmenuOpen] = useState(false);
	const [isDebtModalOpen, setDebtModalOpen] = useState(false);
	const [userMail, setUserMail] = useState("");


	const getUserRole = useCallback(
		async (user) => {
			const database = getDatabase();
			const userRef = ref(database, `users/${user.uid}`);

			try {
				const userSnapshot = await get(userRef);

				if (!userSnapshot.exists()) {
					await set(userRef, {
						uid: user.uid,
						username: user.displayName,
						email: user.email,
						role: "user",
					});
					setUserRole("User");
				} else {
					const role = userSnapshot.val().role;
					setUserRole(role.charAt(0).toUpperCase() + role.slice(1));
					const mail = userSnapshot.val().email;
					setUserMail(mail);
				}
			} catch (error) {
				console.error("Error getting user data:", error);
			}
		},
		[setUserRole, setUserMail]
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

	const displaySubMenu = useCallback(() => {
		setProfileSubmenuOpen(true);
	}, []);
	const closeSubMenu = useCallback(() => {
		setProfileSubmenuOpen(false);
	}, []);

	const onLogOut = useCallback(async () => {
		try {
			await signOut(auth);
			setUserLogged(false);
			setUserRole("");
			setUserMail("");
		} catch (err) {
			console.error(err);
		}
	}, [setUserLogged, setUserRole]);

	const onModalCloseClick = useCallback(() => {
		setRestaurantModalOpen(false);
	}, []);

	const onDebtModalClose = useCallback(() => {
		setDebtModalOpen(false);
	}, []);

	const onDebtModalOpen = useCallback(() => {
		setDebtModalOpen(true);
	}, []);

	const onRestaurantModalOpen = useCallback(() => {
		setRestaurantModalOpen(true);
	}, []);

	return (
		<div className="navbar">
			{isRestaurantModalOpen ? (
				<AddRestaurantModal
					onCloseClick={onModalCloseClick}
					triggerReload={triggerReload}
					setTriggerReload={setTriggerReload}
				/>
			) : (
				""
			)}
			{isDebtModalOpen ? <DebtModal onDebtModalClose={onDebtModalClose} /> : ""}
			<div className="nav-item">
				<a href="https://neo.ae/">
					<img className="Logo" src={NeoLogo} alt="Neo Mena's Logo" />
				</a>
			</div>
			<div className="nav-item">
				<h3 className="title-nav">{userMail}</h3>
			</div>
			<div className="nav-item button-holder">
				{isUserLogged ? (
					<div className="profile-wrapper" onClick={displaySubMenu}>
						<img className="profile-button" src={ProfileIcon} alt="" />
						{isProfileSubmenuOpen ? (
							<HoverMenu
								onLogOut={onLogOut}
								onRestaurantModalOpen={onRestaurantModalOpen}
								closeSubMenu={closeSubMenu}
								userRole={userRole}
								onDebtModalOpen={onDebtModalOpen}
							/>
						) : null}
					</div>
				) : null}

				{!isUserLogged ? (
					<button className="btn login-btn" onClick={signInWithGoogle}>
						Login
					</button>
				) : null}
			</div>
		</div>
	);
}

export default NavBar;
