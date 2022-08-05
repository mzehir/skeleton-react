import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <>
      <h5>AuthLayout</h5>
      {children}
      <Outlet />
    </>
  );
};

export default AuthLayout;
