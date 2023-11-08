const LoadingButton = (props) => {
	const buttonProps = {...props}
	delete buttonProps.loading
	return (
		<>
			{props.loading ? (
				<button className="btn btn-primary" type="button" disabled>
					<span
						className="spinner-border spinner-border-sm"
						aria-hidden="true"></span>
					<span className="visually-hidden" role="status">
						Ładowanie...
					</span>
				</button>
			) : (
				<button {...buttonProps} className="btn btn-primary mt-2">{props.label}</button>
			)}
		</>
	);
};
export default LoadingButton;
