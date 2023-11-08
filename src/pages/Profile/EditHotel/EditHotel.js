import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import HotelForm from "../HotelForm";
import axios from "../../../axios";
import { useEffect, useState } from "react";

const EditHotel = (props) => {
	const [auth] = useAuth();
	const { id } = useParams();
	const history = useNavigate();
	const [hotel, setHotel] = useState(null);

	const submit = async (form) => {
		await axios.patch(`/hotels/${id}.json?auth=${auth.token}`, form);
		history("/profil/hotele");
	};

	const fetchHotel = async () => {
		const res = await axios.get(`/hotels/${id}.json`);
		const hotelData = res.data;

		delete hotelData.user_id;
		delete hotelData.rating;

		setHotel(hotelData);
	};

	useEffect(() => {
		fetchHotel();
	}, []);

	return (
		<div className="card">
			<div className="card-header">Edytuj hotel</div>
			<div className="card-body">
				<p className="text-muted">Uzupełnij dane hotelu</p>

				<HotelForm hotel={hotel} onSubmit={submit} />
			</div>
		</div>
	);
};
export default EditHotel;
