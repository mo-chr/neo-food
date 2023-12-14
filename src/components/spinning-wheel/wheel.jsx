// WheelComponent.js
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "./style.scss";
import data from "./restaurants";
import confetti from "https://cdn.skypack.dev/canvas-confetti";

const WheelComponent = ({ isUserLogged }) => {
	const [mustSpin, setMustSpin] = useState(false);
	const [prizeNumber, setPrizeNumber] = useState(0);
	const [winner, setWinner] = useState(0);
	const [isWinnerShown, setWinnerShown] = useState(false);

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
		<>
			<div className="box">
				{isWinnerShown && (
					<>
						<div className="winner">{`The winner is ${data[winner].option} !!`}</div>
					</>
				)}
				{!isWinnerShown && (
					<Wheel
						mustStartSpinning={mustSpin}
						prizeNumber={prizeNumber}
						backgroundColors={["#00b3ff", "#4444dd"]}
						textColors={["#ffffff"]}
						outerBorderColor={["#3e3e86"]}
						innerBorderColor={["#3e3e86"]}
						radiusLineColor={["#3e3e86"]}
						data={data}
						fontSize={14}
						onStopSpinning={() => {
							setMustSpin(false);
							showWinnerFor10Seconds();
							confetti();
						}}
					/>
				)}
				{isWinnerShown ? (
					""
				) : (
					<button
						disabled={isUserLogged ? false : true}
						className="spinButton"
						onClick={handleSpinClick}
					>
						Spin
					</button>
				)}
			</div>
		</>
	);
};

export default WheelComponent;
