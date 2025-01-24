import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function NewUser() {
	const navigate = useNavigate();
	const { updateUserProfile } = useContext(AuthContext);

	// 1) Additional form fields to complete profile
	const [extraData, setExtraData] = useState({
		sex: "",
		location: "",
		about: "",
	});

	function handleExtraChange(e) {
		const { name, value } = e.target;
		setExtraData((prev) => ({ ...prev, [name]: value }));
	}

	function handleSave() {
		// 2) Get userId from localStorage (the ID of the currently logged-in user)
		const userId = localStorage.getItem("authUserId");
		if (!userId) {
			alert("No user found. Are you logged in?");
			return;
		}

		// 3) Update user with extra fields in context
		updateUserProfile(parseInt(userId, 10), {
			sex: extraData.sex,
			location: extraData.location,
			about: extraData.about,
		});

		// 4) Navigate user to the homepage (or anywhere else you want)
		navigate("/");
	}

	return (
		<div>
			<h2>Complete Your Profile</h2>
			<label>
				Sex:
				<select
					name="sex"
					value={extraData.sex}
					onChange={handleExtraChange}
					defaultValue=""
					required
				>
					<option value="" disabled hidden>
						-- Select an option --
					</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</select>
			</label>

			<label>
				Location:
				<input
					name="location"
					value={extraData.location}
					onChange={handleExtraChange}
					required
				/>
			</label>

			<label>
				About:
				<textarea
					name="about"
					value={extraData.about}
					onChange={handleExtraChange}
				/>
			</label>

			<button onClick={handleSave}>Save Profile</button>
		</div>
	);
}
