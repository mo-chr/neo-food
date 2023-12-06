import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "./style.scss";
import data from "./restaurants";

const WheelComponent = () => {
	const [mustSpin, setMustSpin] = useState(false);
	const [prizeNumber, setPrizeNumber] = useState(0);

	const handleSpinClick = () => {
		if (!mustSpin) {
			const newPrizeNumber = Math.floor(Math.random() * data.length);
			setPrizeNumber(newPrizeNumber);
			setMustSpin(true);
		}
	};

	return (
		<>
			<div className="box">
				<Wheel
					mustStartSpinning={mustSpin}
					prizeNumber={prizeNumber}
					backgroundColors={["#00b3ff", "#4444dd"]}
					textColors={["#ffffff"]}
					outerBorderColor={["#3e3e86"]}
					innerBorderColor={["#3e3e86"]}
					radiusLineColor={["#3e3e86"]}
					data={data}
					onStopSpinning={() => {
						setMustSpin(false);
					}}
				/>
				<button className="spinButton" onClick={handleSpinClick}>
					SPIN
				</button>
			</div>
		</>
	);
};

export default WheelComponent;