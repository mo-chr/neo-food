import React, { useEffect, useState } from "react";
import "./style.scss";
import { database } from "../../../config/firebase";
import { ref, getDatabase, get, push, set } from "firebase/database";

function AddRestaurantModal({ onCloseClick, onSubmit }) {
	// State to store the list of restaurants
	const [restaurants, setRestaurants] = useState([]);

	// State to track whether data is being loaded
	const [loading, setLoading] = useState(true);

	// State for the new restaurant name
	const [newRestaurantName, setNewRestaurantName] = useState("");

	// State for the selected restaurant in the dropdown
	const [selectedRestaurant, setSelectedRestaurant] = useState("");

	// useEffect to fetch restaurants from Firebase when the component mounts
	useEffect(() => {
		const fetchRestaurants = async () => {
			try {
				const databaseRef = ref(getDatabase(), "restaurants");
				const snapshot = await get(databaseRef);
				const restaurantData = snapshot.val();

				if (restaurantData) {
					const restaurantArray = Object.values(restaurantData);
					setRestaurants(restaurantArray);
				}

				setLoading(false);
			} catch (error) {
				console.error("Error fetching restaurants from Firebase:", error);
				setLoading(false);
			}
		};

		fetchRestaurants();
	}, []);

	const handleAddRestaurant = async () => {
		try {
			if (newRestaurantName.trim() === "") {
				console.error("Please enter a valid restaurant name");
				return;
			}

			const isRestaurantExists = restaurants.some(
				(restaurant) => restaurant.name === newRestaurantName
			);

			if (isRestaurantExists) {
				console.error("Restaurant with the same name already exists");
				return;
			}

			const databaseRef = ref(getDatabase(), "restaurants");
			const newRestaurantRef = push(databaseRef);
			await set(newRestaurantRef, {
				name: newRestaurantName,
			});

			// Update the state with the new restaurant name
			setNewRestaurantName("");
			setRestaurants([...restaurants, { name: newRestaurantName }]);
		} catch (error) {
			console.error("Error adding restaurant to Firebase:", error);
		}
	};

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
					<input
						className="restaurant-name-input"
						type="text"
						value={newRestaurantName}
						onChange={(e) => setNewRestaurantName(e.target.value)}
					/>
				</div>
				<div className="modal-content">
					<label className="input-label" htmlFor="select-restaurant">
						Present Restaurants
					</label>
					{loading ? (
						<p>Loading...</p>
					) : restaurants.length === 0 ? (
						<p>No restaurants available.</p>
					) : (
						<select
							id="select-restaurant"
							value={selectedRestaurant}
							onChange={(e) => setSelectedRestaurant(e.target.value)}
						>
							<option value="" disabled>
								Select a restaurant
							</option>
							{restaurants.map((restaurant) => (
								<option key={restaurant.name} value={restaurant.name}>
									{restaurant.name}
								</option>
							))}
						</select>
					)}
				</div>
				<div className="modal-footer">
					<button className="submit-btn" onClick={handleAddRestaurant}>
						Add Restaurant
					</button>
				</div>
			</div>
		</div>
	);
}

export default AddRestaurantModal;
