import img from "../../assets/images/images.png";
import styles from "./ProfileHeader.module.css";

export default function ProfileHeader({ name }) {
	return (
		<>
			<aside className={styles.imageContainer}>
				<img src={img} alt="Future Profile" className={styles.profileImage} />
			</aside>
			<div className={styles.textContainer}>
				<h4 className={styles.userName}>{name}</h4>
			</div>
		</>
	);
}
