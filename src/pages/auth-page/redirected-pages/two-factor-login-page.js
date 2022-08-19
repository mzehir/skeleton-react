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

  const setLocalStroge = () => {
    let obj = {
      name: "ahmet",
      surname: "turgut",
      email: "deneme@gmail.com",
      accessToken: "asdpkoasdapksdasd5874da9s6d4as8d",
    };

    localStorage.setItem("aft5454@gmail.com-userSetting", JSON.stringify(obj));
  };

  const getLocalStroge = () => {
    let userData = JSON.parse(
      localStorage.getItem("aft5454@gmail.com-userSetting")
    );
    debugger;
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

      <button
        onClick={() => {
          setLocalStroge();
        }}
      >
        setLocalStroge
      </button>

      <button
        onClick={() => {
          getLocalStroge();
        }}
      >
        getLocalStroge
      </button>
    </div>
  );
};

export default TwoFactorLoginPage;
