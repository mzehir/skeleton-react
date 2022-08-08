import React from "react";
import { useNavigate } from "react-router-dom";
import AuthUseContext from "../../hooks/auth-use-context";
import { LOGIN_PAGE } from "../../utils/constants/router-constants";

const ForgotPasswordPage = () => {
  const { resetPassword } = AuthUseContext();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    let data = {
      email: e.target.email.value,
      username: e.target.username.value,
    };

    resetPassword(data, () => {
      navigate(LOGIN_PAGE.path, { replace: true });
    });
  };
  return (
    <div>
      <h5>Forgot Password Page</h5>
      <form onSubmit={onSubmit}>
        <p>
          Email: <input type="email" name="email" />
        </p>

        <p>
          Username: <input type="text" name="username" />
        </p>

        <button type="submit">Send to Mail</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
