import PropTypes from "prop-types";
import styles from "./Hotel.module.css";
import img from "../../../assets/images/hotel.jpg";
import ThemeContext from "../../../context/themeContext";
import { useContext } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const propTypes = {
	name: PropTypes.string.isRequired,
	city: PropTypes.string.isRequired,
	rating: PropTypes.number.isRequired,
	description: PropTypes.string.isRequired,
};

const Hotel = (props) => {
	const theme = useContext(ThemeContext);

	const [auth] = useAuth();

	const clickHandler = (e) => {
		if (props.onOpen) {
			props.onOpen(props);
		}
	};

	return (
		<div className={`card ${styles.hotel}`}>
			<div className="card-body">
				<div className="row">
					<div className="col-4">
						<img src={img} alt="" className="img-fluid img-thumbnail" />
					</div>
					<div className="col-8">
						<div className="row">
							<div className="col">
								<p className={styles.title}>{props.name}</p>
								<span className="badge bg-light text-dark">{props.city}</span>
							</div>
							<div className="col text-end">
								<h5>Ocena: {props.rating ?? "brak"}</h5>
								<Link
									onClick={clickHandler}
									className={`btn btn-${theme.color} float-end mt-2 px-5`}
									to={`/hotele/${props.id}`}>
									Pokaż
								</Link>
							</div>
						</div>
					</div>
					<div className="col-12">
						<p className={styles.description}>{props.description}</p>
						{auth ? (
							<p className="mt-2">Dostępność: {props.rooms}</p>
						) : (
							<p className="mt-2">Dotępność: Zaloguj się</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

Hotel.propTypes = propTypes;

export default Hotel;
