import styles from "./AuthFormPage.module.css";

const loginForm = (
    <>
        <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
                Email:
            </label>
            <input
                type="email"
                id="email"
                className={styles.formInput}
                placeholder="Enter your email"
                required
            />
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
                Password:
            </label>
            <input
                type="password"
                id="password"
                className={styles.formInput}
                placeholder="Create a password"
                required
            />
        </div>
    </>
);

export default loginForm;