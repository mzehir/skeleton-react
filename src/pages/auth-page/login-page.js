import React from "react";
import { useNavigate } from "react-router-dom";
import AuthUseContext from "../../hooks/auth-use-context";
import {
  DASHBOARD_PAGE,
  FORGOT_PASSWORD_PAGE,
} from "../../utils/constants/router-constants";

const LoginPage = () => {
  const { signIn } = AuthUseContext();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    let data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    signIn(data, () => {
      navigate(DASHBOARD_PAGE.path, { replace: true });
    });
  };
  return (
    <div>
      <h5>Login Page</h5>
      <form onSubmit={onSubmit}>
        <p>
          Email: <input type="email" name="email" />
        </p>
        <p>
          Password <input type="password" name="password" />
        </p>

        <button type="submit">Login</button>
      </form>

      <button
        onClick={() => {
          navigate(FORGOT_PASSWORD_PAGE.path, { replace: true });
        }}
      >
        Forgot Password
      </button>
    </div>
  );
};

export default LoginPage;
