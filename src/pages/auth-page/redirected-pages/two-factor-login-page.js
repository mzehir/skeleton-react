import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthUseContext from "../../../hooks/auth-use-context";
import { DASHBOARD_PAGE } from "../../../utils/constants/router-constants";

const TwoFactorLoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifySignIn } = AuthUseContext();

  const onSubmit = (e) => {
    e.preventDefault();
    let token = searchParams.get("token");

    if (!token) {
      alert("try again");
    } else {
      let data = {
        verificationCode: e.target.verificationCode.value.trim(),
        token: token,
      };

      verifySignIn(data, () => {
        navigate(DASHBOARD_PAGE.path, { replace: true });
      });
    }
  };

  return (
    <div>
      <h5>Two Factor Login Page</h5>
      <form onSubmit={onSubmit}>
        <p>
          Email: <input type="text" name="verificationCode" />
        </p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default TwoFactorLoginPage;
