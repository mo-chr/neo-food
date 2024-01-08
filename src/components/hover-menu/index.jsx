import React from "react";
import "./style.scss";
import OutsideAlerter from "../../utils";
function HoverMenu({
	onLogOut,
	onRestaurantModalOpen,
	displaySubMenu,
	closeSubMenu,
	userRole,
}) {
	const onOutsideClick = () => {
		closeSubMenu();
	};
	return (
		<OutsideAlerter onOutsideClick={onOutsideClick}>
			<div className="hover-menu">
				<ul>
					{userRole === "Admin" && (
						<li onClick={onRestaurantModalOpen}>Add Restaurant</li>
					)}

					<li>Add Debt (Coming Soon)</li>
					<li onClick={onLogOut}> Logout</li>
				</ul>
			</div>
		</OutsideAlerter>
	);
}

export default HoverMenu;
