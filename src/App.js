import React, { useReducer, lazy, Suspense, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";

import Menu from "./components/Menu/Menu";
import Searchbar from "./components/Searchbar/Searchbar";
import Layout from "./components/Layout/Layout";

import Footer from "./components/Footer/Footer";
import ThemeButton from "./components/UI/ThemeButton/ThemeButton";
import ThemeContext from "./context/themeContext";
import AuthContext from "./context/authContext";
import ReducerContext from "./context/reducerContext";

import { reducer, initialState } from "./reducer";
import Home from "./pages/Home/Home";
import Hotel from "./pages/Hotel/Hotel";
import Search from "./pages/Search/Search";
import ProfileDetails from "./pages/Profile/ProfileDetails";
import MyHotels from "./pages/Profile/MyHotels";
import NotFound from "./pages/404/404";
import Login from "./pages/Auth/Login/Login";
import ErrorBoundary from "./hoc/ErrorBoundary";
import AddHotel from "./pages/Profile/AddHotel/AddHotel";
import Register from "./pages/Auth/Register/Register";
import EditHotel from "./pages/Profile/EditHotel/EditHotel";
const LazyProfile = lazy(() => import("./pages/Profile/Profile"));

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const header = (
		<Header>
			<Searchbar />
			<ThemeButton />
		</Header>
	);

	const content = (
		<ErrorBoundary>
			<Routes>
				<Route
					path="/profil"
					element={
						state.user ? (
							<ErrorBoundary>
								<Suspense fallback={<p>Ładuję zawartość...</p>}>
									<LazyProfile />
								</Suspense>
							</ErrorBoundary>
						) : (
							<Navigate to="/zaloguj" />
						)
					}>
					<Route index element={<ProfileDetails />} />
					<Route path="hotele">
						<Route index element={<MyHotels />} />
						<Route path="dodaj" element={<AddHotel />} />
						<Route path="edytuj/:id" element={<EditHotel />} />
					</Route>
				</Route>

				<Route exact={true} path="/" element={<Home />} />
				<Route path="/wyszukaj/:term?" element={<Search />} />
				<Route path="/hotele/:id" element={<Hotel />} />

				<Route path="/zaloguj" element={<Login />} />
				<Route path="/zarejestruj" element={<Register />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</ErrorBoundary>
	);

	const menu = <Menu />;
	const footer = <Footer />;

	return (
		<Router>
			<AuthContext.Provider
				value={{
					user: state.user,
					login: (user) => dispatch({ type: "login", user }),
					logout: () => dispatch({ type: "logout" }),
				}}>
				<ThemeContext.Provider
					value={{
						color: state.theme,
						onChangeTheme: () => dispatch({ type: "change-theme" }),
					}}>
					<ReducerContext.Provider value={{ state: state, dispatch: dispatch }}>
						<Layout
							header={header}
							menu={menu}
							content={content}
							footer={footer}
						/>
					</ReducerContext.Provider>
				</ThemeContext.Provider>
			</AuthContext.Provider>
		</Router>
	);
}

export default App;
