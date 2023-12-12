import React from "react";
import "./style.scss";

function AddRestaurantModal({ onCloseClick, onSubmit }) {
	return (
		<div className="add-restaurant-modal">
			<div className="modal-box">
				<div className="modal-header">
					<button className="close-btn" onClick={onCloseClick}>
						X
					</button>
				</div>
				<div className="modal-content">
					<label className="input-label" htmlFor="restaurant-name">
						Restaurant Name
					</label>
					<input className="restaurant-name-input" type="text" />
				</div>
				<div className="modal-footer">
					<button className="submit-btn" onClick={onSubmit}>
						Add Restaurant
					</button>
				</div>
			</div>
		</div>
	);
}

export default AddRestaurantModal;
