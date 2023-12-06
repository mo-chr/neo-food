import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "./style.scss";
const data = [{ option: "0" }, { option: "Abo ALi" }, { option: "Al Jawad" }];

export default () => {
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
