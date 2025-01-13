import img from "../../assets/images/images.png";
import styles from "./ProfileHeader.module.css";

export default function ProfileHeader() {
	return (
		<div className={styles.profileHeader}>
			<div className={styles.imageContainer}>
				<img
					src={img}
					alt="Future Profile Image"
					className={styles.profileImage}
				/>
			</div>
			<div className={styles.textContainer}>
				<h1 className={styles.userName}>Profile Header</h1>
			</div>
		</div>
	);
}
