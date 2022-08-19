import jwtDecode from "jwt-decode";
import axios from "./axios";

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken, bypassVerifyToken) => {
  if (accessToken) {
    // localStorage.setItem("accessToken", accessToken);
    // sessionStorage.setItem("accessToken", accessToken); // Bunun silinmesi yada yukarıdaki satırın silinmesi muhtemel.
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // const decoded = jwtDecode(accessToken);
    // if (decoded.isDeferrable) {
    //   sessionStorage.setItem(
    //     "remainingSessionTime",
    //     decoded.exp - Date.now() / 1000
    //   );
    // }
  } else {
    // localStorage.removeItem("accessToken");
    // sessionStorage.removeItem("accessToken"); // Bunun silinmesi yada yukarıdaki satırın silinmesi muhtemel.
    delete axios.defaults.headers.common.Authorization;
  }

  if (bypassVerifyToken) {
    sessionStorage.setItem("bypassVerifyToken", bypassVerifyToken);
  } else {
    sessionStorage.removeItem("bypassVerifyToken");
  }
};

export { isValidToken, setSession };
