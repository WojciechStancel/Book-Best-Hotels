import { useState } from "react";

const useStateStorage = (key, defaultValue) => {
	const [state, setState] = useState(() => {
		const storageValue = window.localStorage.getItem(key);
		if (storageValue) {
			return JSON.parse(storageValue);
		} else {
			return defaultValue;
		}
	});

	const setValue = (val) => {
		setState(val);
		window.localStorage.setItem(key, JSON.stringify(val));
	};

	return [state, setValue];
};
export default useStateStorage;
