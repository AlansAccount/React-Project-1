import { Form, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import Button from "../../common/Button";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import styles from "./AuthFormPage.module.css";

export default function AuthFormPage() {
  const {
    authMode, 
    handleAuthMode,
    handleChange,
    formData,
    loginWithEmailPassword,
    signUpUser
  } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (authMode) {
      // Attempt login
      const result = loginWithEmailPassword(formData.email, formData.password);
      if (!result.success) {
        alert(result.message);
        return;
      }
      console.log("Logged in user:", result.user);
      // Optionally navigate somewhere, e.g. /profile
      // navigate("/profile");
    } else {
      // Attempt sign-up
      const result = signUpUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        dateOfBirth: formData.dateOfBirth
      });
      if (!result.success) {
        alert(result.message);
        return;
      }
      console.log("Signed up user:", result.user);

      // Two-step flow: navigate to /Auth/complete-registry
      navigate("/Auth/complete-registry");
    }
  }

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.authTitle}>
        {authMode ? "Login" : "Signup"}
      </h2>

      <Form className={styles.authForm} onSubmit={handleSubmit}>
        {authMode ? (
          <LoginForm onChange={handleChange} />
        ) : (
          <SignupForm onChange={handleChange} />
        )}
        <div>
          <Button type="submit">
            {authMode ? "Login" : "Create Account"}
          </Button>
          <aside style={{ float: "right" }}>
            <button onClick={handleAuthMode}>
              {authMode ? "Sign Up Here." : "Login Here."}
            </button>
          </aside>
        </div>
      </Form>
    </div>
  );
}
