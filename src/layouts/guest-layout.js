import React from "react";
import { Outlet } from "react-router-dom";

const GuestLayout = ({ children }) => {
  return (
    <>
      <h5>GuestLayout</h5>
      {children}
      <Outlet />
    </>
  );
};

export default GuestLayout;
