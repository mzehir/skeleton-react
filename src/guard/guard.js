import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";

import AuthUseContext from "../hooks/auth-use-context";
import { LOGIN_PAGE } from "../utils/constants/router-constants";

function AuthGuard({ children }) {
  let location = useLocation();
  const { isInitialized, isAuthenticated } = AuthUseContext();

  if (isInitialized && !isAuthenticated) {
    return <Navigate to={LOGIN_PAGE.path} state={{ from: location }} replace />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
