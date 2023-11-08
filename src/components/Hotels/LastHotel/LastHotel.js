import { Link } from "react-router-dom";


const LastHotel = (props) => {

    if(!props) return null

	return (
		<div className="card bg-light">
			<div className="card-header text-center">
				Ostatnio oglądana oferta! Chcesz do niej wrócić?
			</div>
			<div className="card-body">
				<div className="d-flex justify-content-between">
					<h5 className="card-title">{props.name}</h5>
                    <span className="badge bg-light text-dark">{props.city}</span>
					<p>Ocena: {props.rating} </p>
				</div>

				<div className="d-flex justify-content-center">
					<Link to={`/hotele/${props.id}`} className={`btn btn-sm btn-light`}>
						Zobacz
					</Link>
					<button href="#section" className={`btn btn-sm btn-light`} onClick={props.onRemove} >
						Nie
					</button>
				</div>
			</div>
		</div>
	);
};
export default LastHotel;
