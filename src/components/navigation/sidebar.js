import React from "react";
import { useNavigate } from "react-router-dom";
import AuthUseContext from "../../hooks/auth-use-context";
import { LOGIN_PAGE } from "../../utils/constants/router-constants";

const Sidebar = () => {
  const { signOut } = AuthUseContext();
  const navigate = useNavigate();
  
  const onSubmit = () => {
    signOut(() => {
      navigate(LOGIN_PAGE.path, { replace: true });
    })
  };
  return (
    <div>
      <h5>Component sidebar.js</h5>
      <button onClick={onSubmit}>Logout</button>
    </div>
  );
};

export default Sidebar;
