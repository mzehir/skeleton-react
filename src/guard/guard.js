import * as React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// import AuthUseContext from "../../hooks/AuthUseContext";
// import { LOGIN } from "../../router/const";

function AuthGuard({ children }) {
  //   let location = useLocation();
  //   const { isInitialized, isAuthenticated } = AuthUseContext();

  //   if (isInitialized && !isAuthenticated) {
  //     return <Navigate to={LOGIN.path} state={{ from: location }} replace />;
  //   }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
