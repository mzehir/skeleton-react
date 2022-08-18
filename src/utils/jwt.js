import jwtDecode from "jwt-decode";
import axios from "./axios";

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return {
    isValid: decoded.exp > currentTime,
    remainingSessionTime: decoded.exp - currentTime,
  };
};

const setSession = (accessToken, bypassVerifyToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    let validToken = isValidToken(accessToken);
    if (validToken.isValid) {
      sessionStorage.setItem("remainingSessionTime",validToken.remainingSessionTime)
    }
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }

  if (bypassVerifyToken) {
    sessionStorage.setItem("bypassVerifyToken", bypassVerifyToken);
  } else {
    sessionStorage.removeItem("bypassVerifyToken");
  }
};

export { isValidToken, setSession };

//? sessionStorage, localStorage, cookies araştırılacak.
