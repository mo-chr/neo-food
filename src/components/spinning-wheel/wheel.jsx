import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import "./style.scss";
import data from "./restaurants";
import confetti from "canvas-confetti";
import { ref, getDatabase, get } from "firebase/database";

const WheelComponent = ({ isUserLogged, setTriggerReload, triggerReload }) => {
	const [mustSpin, setMustSpin] = useState(false);
	const [prizeNumber, setPrizeNumber] = useState(0);
	const [winner, setWinner] = useState(0);
	const [isWinnerShown, setWinnerShown] = useState(false);
	const [processedData, setProcessedData] = useState([]);

	useEffect(() => {
		const fetchRestaurants = async () => {
			try {
				const databaseRef = ref(getDatabase(), "restaurants");
				const snapshot = await get(databaseRef);
				const data = snapshot.val();

				if (data) {
					const restaurantArray = Object.values(data);
					const processedData = restaurantArray.map((restaurant) => ({
						option: restaurant.name.toUpperCase(),
					}));
					setProcessedData(processedData);
					console.log(processedData, "processed Data");
				}
			} catch (error) {
				console.error("Error fetching or processing data:", error);
			}
		};

		fetchRestaurants();
		setTriggerReload(false);
	}, [triggerReload, setTriggerReload]);

	const handleSpinClick = () => {
		if (!mustSpin) {
			setWinnerShown(false);
			const newPrizeNumber = Math.floor(Math.random() * data.length);
			setPrizeNumber(newPrizeNumber);
			setWinner(newPrizeNumber);
			setMustSpin(true);
		}
	};

	const showWinnerFor10Seconds = () => {
		setWinnerShown(true);
		setTimeout(() => {
			setWinnerShown(false);
		}, 5000);
	};

	return (
		<div className="box">
			{isWinnerShown && (
				<div className="winner">{`The winner is ${
					processedData[winner]?.option || ""
				} !!`}</div>
			)}
			{!isWinnerShown && (
				<Wheel
					mustStartSpinning={mustSpin}
					prizeNumber={prizeNumber}
					backgroundColors={[
						"#8A2BE2", // Blue Violet
						"#6A5ACD", // Slate Blue
						"#483D8B", // Dark Slate Blue
						"#4169E1", // Royal Blue
						"#6495ED", // Cornflower Blue
						"#1E90FF", // Dodger Blue
						"#00BFFF", // Deep Sky Blue
						"#87CEEB", // Sky Blue
					]}
					textColors={["#ffffff"]}
					outerBorderColor={["#4B0082"]}
					innerBorderColor={["#4B0082"]}
					radiusLineColor={["#4B0082"]}
					data={processedData.length > 1 ? processedData : data}
					fontSize={16}
					onStopSpinning={() => {
						setMustSpin(false);
						showWinnerFor10Seconds();
						confetti();
					}}
				/>
			)}
			{!isWinnerShown && (
				<button
					disabled={!isUserLogged}
					className="spinButton"
					onClick={handleSpinClick}
				>
					Spin
				</button>
			)}
		</div>
	);
};

export default WheelComponent;
