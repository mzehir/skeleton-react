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
  name: null,
  surname: null,
  email: null,
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        name: action.payload.name,
        surname: action.payload.surname,
        email: action.payload.email,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        name: action.payload.name,
        surname: action.payload.surname,
        email: action.payload.email,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        name: null,
        surname: null,
        email: null,
      };
    case SIGN_UP:
      return {
        ...state,
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
        let userInformation = getUserInformation();
        const accessToken = userInformation.accessToken;
        // const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          // setSession(accessToken);

          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              name: userInformation.name,
              surname: userInformation.surname,
              email: userInformation.email,
            },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              name: null,
              surname: null,
              email: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            name: null,
            surname: null,
            email: null,
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
        let userInformation = response.data.authendicatedUser;
        setSession(response.data.accessToken, response.data.bypassVerifyToken);
        setUserInformation(userInformation, response.data.accessToken);
        dispatch({
          type: SIGN_IN,
          payload: {
            name: userInformation.name,
            surname: userInformation.surname,
            email: userInformation.email,
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
      let userInformation = response.data.authendicatedUser;
      setSession(response.data.accessToken, response.data.bypassVerifyToken);
      setUserInformation(userInformation, response.data.accessToken);
      dispatch({
        type: SIGN_IN,
        payload: {
          name: userInformation.name,
          surname: userInformation.surname,
          email: userInformation.email,
        },
      });
      return callback();
    }
  };

  const signOut = async (callback) => {
    setSession(null);
    clearUserInformation();
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

  const setUserInformation = (userInformation, accessToken) => {
    let localStorageData = {
      name: userInformation.name,
      surname: userInformation.surname,
      email: userInformation.email,
      accessToken: accessToken,
    };

    let localStorageKey = `userInformation-${userInformation.email}`;
    localStorage.setItem(localStorageKey, JSON.stringify(localStorageData));
    localStorage.setItem("lastLoggedInUserEmail", userInformation.email);
    sessionStorage.setItem("currentUserEmail", userInformation.email);
  };

  const getUserInformation = () => {
    let currentUserEmail = sessionStorage.getItem("currentUserEmail");
    if (currentUserEmail) {
      // Sayfayı yenilediyse burası
      let userInformation = JSON.parse(
        localStorage.getItem(`userInformation-${currentUserEmail}`)
      );
      return userInformation;
    } else {
      // Pencereyi kapatıp sonra tekrar açtıysa burası
      let lastLoggedInUserEmail = localStorage.getItem("lastLoggedInUserEmail");
      let userInformation = JSON.parse(
        localStorage.getItem(`userInformation-${lastLoggedInUserEmail}`)
      );
      sessionStorage.setItem("currentUserEmail", userInformation.email);
      return userInformation;
    }
  };

  const clearUserInformation = () => {
    let currentUserEmail = sessionStorage.getItem("currentUserEmail");
    localStorage.removeItem(`userInformation-${currentUserEmail}`);
    localStorage.removeItem("lastLoggedInUserEmail");
    sessionStorage.removeItem("currentUserEmail");
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

// Kullanıcı login olursa

// Kullanıcı login durumunda sayfayı yenilerse

// Kullanıcı logout olma isteği yaparsa (client)

// Kullanıcı pencereyi kapatıp tekrar açarsa ??
