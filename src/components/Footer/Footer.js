import { useContext } from "react";
import ThemeContext from "../../context/themeContext";

const Footer = () => {
	const theme = useContext(ThemeContext);
	return (
		<div className={`text-center m-3 text-${theme.color}`}>
			Book Best Hotels 2023
		</div>
	);
};
export default Footer;
