import React from "react";
import PropTypes from "prop-types";
import Hotel from "./Hotel/Hotel";
import styles from "./Hotels.module.css";

const propTypes = {
	hotels: PropTypes.array.isRequired,
};

const Hotels = (props) => {
	const count = props.hotels.length;
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Offers ({count}):</h2>
			{props.hotels.map((hotel) => (
				<Hotel key={hotel.id} {...hotel} onOpen={props.onOpen}/>
			))}
		</div>
	);
};

Hotels.propTypes = propTypes;
export default React.memo(Hotels);
