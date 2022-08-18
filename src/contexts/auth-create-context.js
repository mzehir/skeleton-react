import React, { createContext, useReducer, useEffect } from "react";
import ApiUseContext from "../hooks/api-use-context";
import { isValidToken, setSession } from "../utils/jwt";

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const SIGN_UP = "SIGN_UP";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  const { APIPath, postData } = ApiUseContext();

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              // user
              //! user bilgileri lazım
            },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signUp = async (data, callback = () => {}) => {
    const response = await postData(APIPath.SIGN_UP, {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
    });

    if (response?.isSuccess) {
      return callback();
    }
  };

  const signIn = async (values, callback = () => {}) => {
    let bypassVerifyToken = sessionStorage.getItem("bypassVerifyToken");
    let data = {
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    };

    if (bypassVerifyToken) {
      data.bypassVerifyToken = bypassVerifyToken;
    }

    const response = await postData(APIPath.SIGN_IN, data);

    if (response) {
      if (response.data.token) {
        // two-factor-login-page sayfasına token ile...
        return callback(response.data.token);
      } else {
        setSession(response.data.accessToken, response.data.bypassVerifyToken);
        dispatch({
          type: SIGN_IN,
          payload: {
            user: response.data.user,
          },
        });
        return callback();
      }
    }
  };

  const verifySignIn = async (values, callback = () => {}) => {
    let data = {
      verificationCode: values.verificationCode,
      token: values.token,
    };
    const response = await postData(APIPath.VERIFY_SIGN_IN, data);

    if (response) {
      setSession(response.data.accessToken, response.data.bypassVerifyToken);

      dispatch({
        // Burada kaldım
        type: SIGN_IN,
        payload: {
          user: response.data.user,
        },
      });
      return callback();
    }
  };

  const signOut = async (callback) => {
    setSession(null);
    dispatch({ type: SIGN_OUT });
    callback();
  };

  const resetPassword = async (data, callback) => {
    const response = await postData(APIPath.RESET_PASSWORD, {
      email: data.email,
    });

    if (response?.isSuccess) {
      return callback();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        signUp,
        signIn,
        verifySignIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
