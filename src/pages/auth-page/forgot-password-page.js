import React from "react";
import AuthUseContext from "../../hooks/auth-use-context";

const ForgotPasswordPage = () => {
  const { resetPassword } = AuthUseContext();

  const onSubmit = (e) => {
    e.preventDefault();

    let data = {
      email: e.target.email.value,
    };

    resetPassword(data, () => {
      alert("Click on the password reset link sent to your mailbox.");
    });
  };
  return (
    <div>
      <h5>Forgot Password Page</h5>
      <form onSubmit={onSubmit}>
        <p>
          Email: <input type="email" name="email" />
        </p>
        <button type="submit">Send to Mail</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
