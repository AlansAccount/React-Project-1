export default function AccountSettingsForm() {
	return (
		<div>
			<h4>Account Settings Form</h4>
			<form>
				<label htmlFor="username">Username:</label>
				<input type="text" id="username" name="username" />
				<br />
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" />
				<br />
				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" />
				<br />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
