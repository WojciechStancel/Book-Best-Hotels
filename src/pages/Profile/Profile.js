
import { Link, Outlet} from "react-router-dom";
const Profile = () => {


	return (
		<div className="card">
			<div className="card-header">
				<h2>Moje konto</h2>
			</div>
			<div className="card-body">
				<ul className="nav nav-tabs">
					<li className="nav-item">
						<Link  to="/profil" className="nav-link">
							Profil
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/profil/hotele" className="nav-link">
							Hotele
						</Link>
					</li>
				</ul>

				<div className="pt-4">
				<Outlet />
				</div>
			</div>
		</div>
	);
};
export default Profile;
