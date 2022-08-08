import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigation/sidebar";

const GuardLayout = ({ children }) => {
  return (
    <>
      <h3>GuardLayout</h3>
      <Sidebar />
      {children}
      <Outlet />
    </>
  );
};

export default GuardLayout;
