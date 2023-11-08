import { useEffect, useState } from "react";

import LoadingButton from "../../components/UI/LoadingButton/LoadingButton";
import { validateEmail } from "../../helpFunctions/validations";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const ProfileDetails = () => {
	const [auth, setAuth] = useAuth();
	const [email, setEmail] = useState(auth.email);
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});

	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const data = {
				idToken: auth.token,
				email: email,
				returnSecureToken: true,
			};
			if (password) {
				data.password = password;
			}

			const res = await axios.post(
				"https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDtv-4ibjAyw9OkYSwb8WIz_YD3A-7q6VE",
				data
			);

			setAuth({
				email: res.data.email,
				token: res.data.idToken,
				userId: res.data.localId,
			});
		} catch (ex) {
			console.log(ex.response);
		}

		setLoading(false);
	};

	useEffect(() => {
		if (validateEmail(email)) {
			setErrors({ ...errors, email: "" });
		} else {
			setErrors({ ...errors, email: "Niepoprawny adres email!" });
		}
	}, [email]);

	useEffect(() => {
		if (password.length > 5 || password.length === 0) {
			setErrors({ ...errors, password: "" });
		} else {
			setErrors({ ...errors, password: "Hasło musi mieć więcej niż 5 znaków" });
		}
	}, [password]);

	return (
		<form onSubmit={submit}>
			<div className="form-group">
				<label htmlFor="email">Email</label>
				<input
					className={`form-control ${errors.email ? "is-invalid" : "is-valid"}`}
					type="email"
					name="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<div className="invalid-feedback ">{errors.email}</div>
			</div>
			<div className="form-group">
				<label htmlFor="password">Hasło</label>
				<input
					type="password"
					name="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className={`form-control ${errors.password ? "is-invalid" : ""}`}
				/>
				<div className="invalid-feedback">{errors.password}</div>
			</div>
			<LoadingButton loading={loading} label="Zapisz" />
		</form>
	);
};
export default ProfileDetails;
