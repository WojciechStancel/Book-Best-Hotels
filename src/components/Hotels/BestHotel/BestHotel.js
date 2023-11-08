import { useEffect, useState, useRef, useContext } from "react";
import ThemeContext from "../../../context/themeContext";
import moment from "moment";
import { Link } from "react-router-dom";
const BestHotel = (props) => {
	const theme = useContext(ThemeContext);
	const hotel = props.getHotel();

	const endTimeRef = useRef(moment().add(23, "minutes").add(34, "seconds"));

	const [time, setTime] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			const leftTime = -moment().diff(endTimeRef.current) / 1000;
			const minutes = Math.floor(leftTime / 60);
			const seconds = Math.floor(leftTime % 60);
			setTime(`minut: ${minutes}, sekund: ${seconds}`);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	if (!hotel) return null;
	return (
		<div className="card bg-success-subtle mt-2">
			<div className="card-header text-center">Najlepsza oferta!</div>
			<div className="card-body">
				<div className="d-flex justify-content-around">
					<h5 className="card-title">{hotel.name}</h5>
					<p>Ocena: {hotel.rating} </p>
				</div>
				<p className="text-center">Do końca oferty pozostało:{time}</p>
				<div className="d-flex justify-content-center">
					<Link to={`/hotele/${hotel.id}`} className={`btn btn-sm btn-${theme.color}`}>
						Pokaż
					</Link>
				</div>
			</div>
		</div>
	);
};
export default BestHotel;
