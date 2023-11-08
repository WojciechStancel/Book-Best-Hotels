import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import axios from "../../../axios-auth";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [auth, setAuth] = useAuth();
	const [loading, setLoading] = useState(false);
	const [valid] = useState(null);
	const [error, setError] = useState('')

	const history = useNavigate();

	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await axios.post(
				"accounts:signInWithPassword",
				{
					email,
					password,
					returnSecureToken: true,
				}
			);
			console.log(res);
			setAuth({
				email: res.data.email,
				token: res.data.idToken,
				userId: res.data.localId,
			})
			history('/')
		} catch (ex) {
			setError(ex.response.data.error.message)
			console.log(ex.response);
			setLoading(false);
		}

	};

	if (auth) {
		history('/')
	}

	return (
		<div>
			<h2>Logowanie</h2>

			{valid === false ? <div>Błędne dane logowania</div> : null}

			<form onSubmit={submit}>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						className="form-control"
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Hasło</label>
					<input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="form-control"
					/>
				</div>
				{error ? (
					<div className="alert alert-danger">
						{error}
					</div>
				) : null }
				<LoadingButton loading={loading} label="Zaloguj" />
			</form>
		</div>
	);
};
export default Login;
