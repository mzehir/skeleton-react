import React from "react";
import { Outlet } from "react-router-dom";

const GuestLayout = ({ children }) => {
  return (
    <>
      <h3>GuestLayout</h3>
      {children}
      <Outlet />
    </>
  );
};

export default GuestLayout;
