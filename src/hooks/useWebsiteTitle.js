import { useEffect } from "react";

const useWebsiteTitle = (title) => {
	const setTitle = (newTitle) => {
		document.title = newTitle;
	};
	useEffect(() => {
		if(title){
			setTitle(title)
		}

	}, [title]);

	return setTitle;
};
export default useWebsiteTitle;
