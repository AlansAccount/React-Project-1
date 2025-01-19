import { Form, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import Button from "../../common/Button";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import styles from "./AuthFormPage.module.css";

export default function AuthFormPage() {
  const {
    loginSignup, 
    handleAuthMode,
    handleChange,
    formData,
    loginWithEmailPassword,
    signUpUser
  } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (loginSignup) {
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
        {loginSignup ? "Login" : "Signup"}
      </h2>

      <Form className={styles.authForm} onSubmit={handleSubmit}>
        {loginSignup ? (
          <LoginForm onChange={handleChange} />
        ) : (
          <SignupForm onChange={handleChange} />
        )}
        <div>
          <Button type="submit">
            {loginSignup ? "Login" : "Create Account"}
          </Button>
          <aside style={{ float: "right" }}>
            <button onClick={handleAuthMode}>
              {loginSignup ? "Sign Up Here." : "Login Here."}
            </button>
          </aside>
        </div>
      </Form>
    </div>
  );
}
