import React, { createContext } from "react";
import axios from "../tools/axios";
import { Toastify } from "../components/toastify";
import { ApiError } from "../tools/enums/api.errors";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../tools/constants/router.constants";
import { getErrorMessage } from "../tools/enums/error.messages.enums";

const initialStates = {
  loading: false,
  apiError: null,
  httpError: null,
  showLoginDialog: false,
};

const ApiContext = createContext(initialStates);

function ApiProvider({ children }) {
  let navigate = useNavigate();

  const [loading, setLoading] = React.useState(initialStates.loading);
  const [apiError, setApiError] = React.useState(initialStates.apiError);
  const [httpError, setHttpError] = React.useState(initialStates.httpError);
  const [showLoginDialog, setShowLoginDialog] = React.useState(
    initialStates.showLoginDialog
  );

  const runToast = (type, message) => {
    Toastify({
      type: type ? type : "info",
      message: message ? message : "Message not found!",
    });
  };

  const httpRequest = async (
    method,
    path,
    data = {},
    options = {
      showLoading: true,
      showLoginDialog: true,
    }
  ) => {
    try {
      setLoading(options.showLoading || initialStates.loading);
      setApiError(initialStates.apiError);
      setHttpError(initialStates.httpError);
      setShowLoginDialog(initialStates.showLoginDialog);

      let res = await axios[method](path, data);
      // runToast("success", "başarılı işlem"); //TODO: lang?
      return res.data;
    } catch (error) {
      if (error.apiError) {
        setApiError(error);
        if (error.apiErrorCode == ApiError["DEFERRABLE_TOKEN_EXPIRED"]) {
          const accessToken = sessionStorage.getItem("accessToken");
          const decoded = jwtDecode(accessToken);
          if (decoded.isDeferrable) {
            setShowLoginDialog(options.showLoginDialog);
          } else {
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("remainingSessionTime");
            delete axios.defaults.headers.common.Authorization;
            navigate(LOGIN.path);
          }
        } else {
          let message = getErrorMessage({
            errorType: "apiErrors",
            errorCode: error.apiErrorCode,
          });
          runToast("error", message);
        }
      } else {
        setHttpError(error);
        if (error.statusCode == 401) {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("remainingSessionTime");
          delete axios.defaults.headers.common.Authorization;
          let message = getErrorMessage({
            errorType: "httpErrors",
            errorCode: error.statusCode,
          });
          runToast("error", message);
          navigate(LOGIN.path);
        } else {
          let message = getErrorMessage({
            errorType: "httpErrors",
            errorCode: error.statusCode,
          });
          runToast("error", message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const postData = async (
    path,
    data = {},
    options = {
      showLoading: true,
      showLoginDialog: true,
    }
  ) => {
    return httpRequest("post", path, data, options);
  };

  const getData = async (
    path,
    data = {},
    options = {
      showLoading: true,
      showLoginDialog: true,
    }
  ) => {
    return httpRequest("get", path, data, options);
  };

  return (
    <ApiContext.Provider
      value={{
        loading,
        setLoading,
        apiError,
        httpError,
        showLoginDialog,
        setShowLoginDialog,
        postData,
        getData,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export { ApiContext, ApiProvider };