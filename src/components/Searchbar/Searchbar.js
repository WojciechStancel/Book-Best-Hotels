import { useState, useContext, useEffect, useRef } from "react";
import ThemeContext from "../../context/themeContext";
import { useNavigate } from "react-router-dom";

const Searchbar = (props) => {
	const [term, setTerm] = useState("");
	const theme = useContext(ThemeContext);
	const history = useNavigate()

	const inputRef = useRef();

	const search = () => {
		history(`/wyszukaj/${term}`)
	};

	const updateTerm = (e) => {
		setTerm(e.target.value);
	};

	useEffect(() => {
		inputRef.current.focus()
	}, []);

	return (
		<div className="d-flex">
			<input
				ref={inputRef}
				className="form-control"
				type="text"
				placeholder="Szukaj..."
				onChange={updateTerm}
				onKeyDown={(e) => e.key === "Enter" && search()}
			/>
			<button className={`ms-2 btn btn-${theme.color}`} onClick={search}>
				Szukaj
			</button>
		</div>
	);
};
export default Searchbar;
