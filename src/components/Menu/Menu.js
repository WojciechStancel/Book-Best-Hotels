import style from "./Menu.module.css";

import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";

const Menu = () => {
	const [auth, setAuth] = useAuth();

	const logout = (e) => {
		e.preventDefault();
		setAuth(false);
	};
	let activeClassName = ({ isActive }) => ({
		textDecoration: isActive ? "underline" : "none",
	});
	return (
		<div className={`${style.menuContainer}`}>
			<ul className={style.menu}>
				<li className={style.menuItem}>
					<NavLink to="/" style={activeClassName}>
						Home
					</NavLink>
				</li>
				{auth ? (
					<>
						<li className={style.menuItem}>
							<NavLink to="/profil" style={activeClassName}>
								Moje konto
							</NavLink>
						</li>
						<li className={style.menuItem}>
							<a href="#section" onClick={logout}>
								Wyloguj się
							</a>
						</li>
					</>
				) : (
					<>
						<li className={style.menuItem}>
							<NavLink to="/zarejestruj" style={activeClassName}>
								Zarejestruj się
							</NavLink>
						</li>
						<li className={style.menuItem}>
							<NavLink to="/zaloguj" style={activeClassName}>
								Zaloguj się
							</NavLink>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};
export default Menu;
