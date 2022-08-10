import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ApiUseContext from "../../../hooks/api-use-context";
import { LOGIN_PAGE } from "../../../utils/constants/router-constants";

const VerifyAccountPage = () => {
  const { APIPath, postData } = ApiUseContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState("");

  const verifyAccount = async () => {
    if (token) {
      let data = {
        token: token,
      };

      const response = await postData(APIPath.VERIFY_EMAIL, data);
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
      <h5>Verify Account Page</h5>
      <button
        onClick={() => {
          verifyAccount();
        }}
      >
        Go to Login Page
      </button>
    </div>
  );
};

export default VerifyAccountPage;
