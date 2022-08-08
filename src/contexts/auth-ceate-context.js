import { createContext, useEffect, useReducer } from "react";

// import axios from "../utils/axios";
// import { isValidToken, setSession } from "../utils/jwt";

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

  //   useEffect(() => {
  //     // const initialize = async () => {
  //     //   try {
  //     //     const accessToken = window.localStorage.getItem("accessToken");

  //     //     if (accessToken && isValidToken(accessToken)) {
  //     //       setSession(accessToken);

  //     //       const response = await axios.get("/api/auth/my-account");
  //     //       const { user } = response.data;

  //     //       console.log(user);

  //     //       dispatch({
  //     //         type: INITIALIZE,
  //     //         payload: {
  //     //           isAuthenticated: true,
  //     //           user,
  //     //         },
  //     //       });
  //     //     } else {
  //     //       dispatch({
  //     //         type: INITIALIZE,
  //     //         payload: {
  //     //           isAuthenticated: false,
  //     //           user: null,
  //     //         },
  //     //       });
  //     //     }
  //     //   } catch (err) {
  //     //     console.error(err);
  //     //     dispatch({
  //     //       type: INITIALIZE,
  //     //       payload: {
  //     //         isAuthenticated: false,
  //     //         user: null,
  //     //       },
  //     //     });
  //     //   }
  //     // };

  //     initialize();
  //   }, []);

  const signUp = async (data, callback) => {
    // const response = await axios.post("/api/auth/sign-up", {
    //   email,
    //   password,
    //   firstName,
    //   lastName,
    // });
    // const { accessToken, user } = response.data;

    // window.localStorage.setItem("accessToken", accessToken);
    // dispatch({
    //   type: SIGN_UP,
    //   payload: {
    //     user,
    //   },
    // });
    //!-------------------------------------------------------
    console.log(data);
    callback();
  };

  const signIn = async (data, callback) => {
    // const response = await axios.post("/api/auth/sign-in", {
    //   email,
    //   password,
    // });
    // const { accessToken, user } = response.data;

    // setSession(accessToken);
    // dispatch({
    //   type: SIGN_IN,
    //   payload: {
    //     user,
    //   },
    // });
    //!-------------------------------------------------------
    console.log(data);
    callback();
  };

  const signOut = async (callback) => {
    // setSession(null);
    // dispatch({ type: SIGN_OUT });
    //!-------------------------------------------------------
    console.log("signOut");
    callback();
  };

  const resetPassword = async (data, callback) => {
    //!-------------------------------------------------------
    console.log(data);
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        signUp,
        signIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };