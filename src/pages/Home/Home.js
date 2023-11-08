import BestHotel from "../../components/Hotels/BestHotel/BestHotel";
import useStateStorage from "../../hooks/useStateStorage";
import LastHotel from "../../components/Hotels/LastHotel/LastHotel";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import Hotels from "../../components/Hotels/Hotels";
import { useEffect, useState } from "react";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import axios from "../../axios";
import ObjectToArray from "../../helpFunctions/objects";

const Home = (props) => {
	useWebsiteTitle("Strona główna");
	const [lastHotel, setLastHotel] = useStateStorage("last-hotel", null);

	const [loading, setLoading] = useState(true);
	const [hotels, setHotels] = useState([]);

	const getBestHotel = () => {
		if (hotels.length < 2) {
			return null;
		} else {
			return hotels.sort((a, b) => (a.rating > b.rating ? -1 : 1))[0];
		}
	};

	const openHotel = (hotel) => {
		setLastHotel(hotel);
	};

	const removeLastHotel = () => {
		setLastHotel(null);
	};

	const fetchHotels = async () => {
		try {
			const res = await axios.get("/hotels.json");

			const newHotel = ObjectToArray(res.data).filter(hotel => hotel.status == 1)


			setHotels(newHotel);
		} catch (ex) {
			console.log(ex.response);
		}

		setLoading(false);
	};

	useEffect(() => {
		fetchHotels();
	}, []);

	return loading ? (
		<LoadingIcon />
	) : (
		<>
			{lastHotel ? (
				<LastHotel {...lastHotel} onRemove={removeLastHotel} />
			) : null}

			{getBestHotel() ? <BestHotel getHotel={getBestHotel} /> : null}
			<Hotels onOpen={openHotel} hotels={hotels} />
		</>
	);
};
export default Home;
