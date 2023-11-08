import { useContext } from "react";
import ThemeContext from "../../../context/themeContext";

function LoadingIcon(props) {
	const theme = useContext(ThemeContext);
	return (
		<div className="text-center">
			<div
				className={`spinner-border text-${theme.color} m-5`}
				role="status"></div>
		</div>
	);
}
export default LoadingIcon;
