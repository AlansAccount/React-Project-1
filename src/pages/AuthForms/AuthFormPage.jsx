import { Form, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import Button from "../../common/Button";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import styles from "./AuthFormPage.module.css";

export default function AuthFormPage() {
  // 1) Extract many values from AuthContext
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
      // 2) If authMode is true, user is trying to login
      const result = loginWithEmailPassword(formData.email, formData.password);
      if (!result.success) {
        alert(result.message);
        return;
      }
      // Optionally navigate to a certain page after login
      // navigate("/profile");
    } else {
      // 3) If authMode is false, user is trying to sign up
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
      // For the two-step flow, go to next step (complete-registry)
      navigate("/Auth/complete-registry");
    }
  }

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.authTitle}>
        {authMode ? "Login" : "Signup"}
      </h2>

      {/* 4) We use a <Form> from react-router-dom, but a regular <form> would also work */}
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
