import React, { useRef, useEffect } from "react";

function useOutsideAlerter(ref, onOutsideClick) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				onOutsideClick();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, onOutsideClick]); // Include onOutsideClick in the dependencies array
}

export default function OutsideAlerter({ children, onOutsideClick }) {
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, onOutsideClick);

	return <div ref={wrapperRef}>{children}</div>;
}
