import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ApiUseContext from "../../../hooks/api-use-context";
import { LOGIN_PAGE } from "../../../utils/constants/router-constants";

const VerifyPasswordPage = () => {
  const { APIPath, postData } = ApiUseContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (token) {
      let data = {
        newPassword: e.target.newPassword.value,
        confirmPassword: e.target.confirmPassword.value,
        passwordToken: token,
      };

      const response = await postData(APIPath.VERIFY_RESET_PASSWORD, data);
      if (response.isSuccess) {
        navigate(LOGIN_PAGE.path, { replace: true });
      }
    } else {
      alert("Try Again");
    }
  };

  useEffect(() => {
    let _token = searchParams.get("token");
    setToken(_token);
  }, []);

  return (
    <div>
      <h5>Verify Password Page</h5>
      <form onSubmit={onSubmit}>
        <p>
          New Password: <input type="password" name="newPassword" />
        </p>

        <p>
          Confirm Password: <input type="password" name="confirmPassword" />
        </p>

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default VerifyPasswordPage;
