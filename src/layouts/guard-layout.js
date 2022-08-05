import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigation/sidebar";

const GuardLayout = ({ children }) => {
  return (
    <>
      <h5>GuardLayout</h5>
      <Sidebar />
      {children}
      <Outlet />
    </>
  );
};

export default GuardLayout;
