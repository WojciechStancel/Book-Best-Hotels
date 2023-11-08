import ObjectToArray from "../../helpFunctions/objects";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Hotels from "../../components/Hotels/Hotels";

const Search = () => {
	const { term } = useParams();
	const [hotels, setHotels] = useState([]);

	const search = async () => {
		try {
			const res = await axios.get("/hotels.json");

			const newHotel = ObjectToArray(res.data).filter((hotel) =>
				hotel.name.includes(term)
			);

			setHotels(newHotel);
		} catch (ex) {
			console.log(ex.response);
		}
	};



	useEffect(()=>{
		search()
	}, [term])


	return (
		<div>
			<h2>Wyniki dla frazy "{term}"</h2>
			<Hotels hotels={hotels} />
		</div>
	);
};
export default Search;
