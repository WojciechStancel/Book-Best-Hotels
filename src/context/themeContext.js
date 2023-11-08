import React from "react";

const ThemeContext = React.createContext({
	color: "primary",
	onChangeTheme: () => {},
});

export default ThemeContext;
