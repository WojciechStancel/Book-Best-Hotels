import { Link, Outlet } from "react-router-dom";
import axios from "../../axios";
import { useEffect, useState } from "react";
import ObjectToArray from "../../helpFunctions/objects";
import useAuth from "../../hooks/useAuth";
const MyHotels = () => {
	const [auth] = useAuth();
	const [hotels, setHotels] = useState([]);
	const fetchHotels = async () => {
		try {
			const res = await axios.get("/hotels.json");

			const newHotel = ObjectToArray(res.data).filter(
				(hotel) => hotel.user_id === auth.userId
			);

			setHotels(newHotel);
		} catch (ex) {
			console.log(ex.response);
		}
	};

	useEffect(() => {
		fetchHotels();
	}, []);

	const deleteHotelHandler = async (id) => {
		try {
			await axios.delete(`/hotels/${id}.json`);
			setHotels(hotels.filter((hotel) => hotel.id !== id));
		} catch (ex) {
			console.log(ex.response);
		}
	};

	return (
		<>
			<div>
				{hotels ? (
					<table className="table">
						<thead>
							<tr>
								<th>Nazwa</th>
								<th>Status hotelu</th>
								<th>Opcje</th>
							</tr>
						</thead>

						<tbody>
							{hotels.map((hotel) => (
								<tr key={hotel.id}>
									<td>{hotel.name}</td>
									<td>
										{hotel.status == 1 ? (
											<span className="badge bg-success">Aktywny</span>
										) : (
											<span className="badge bg-secondary">Nieaktywny</span>
										)}
									</td>
									<td>
										<Link
											to={`/profil/hotele/edytuj/${hotel.id}`}
											className="btn btn-warning">
											Edytuj
										</Link>
										<button
											className="btn btn-danger"
											onClick={() => deleteHotelHandler(hotel.id)}>
											Usuń
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>Lista Twoich hoteli jest pusta</p>
				)}

				<Link to="dodaj" className="btn btn-primary">
					Dodaj hotel
				</Link>

				<Outlet />
			</div>
		</>
	);
};
export default MyHotels;
