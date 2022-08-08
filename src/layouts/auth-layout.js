import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <>
      <h3>AuthLayout</h3>
      {children}
      <Outlet />
    </>
  );
};

export default AuthLayout;
