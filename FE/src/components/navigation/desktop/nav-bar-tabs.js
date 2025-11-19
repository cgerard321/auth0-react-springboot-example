import React from "react";
import { NavBarTab } from "./nav-bar-tab";
import {useAuth} from "react-oidc-context";

export const NavBarTabs = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="nav-bar__tabs">
      <NavBarTab path="/profile" label="Profile" />
      <NavBarTab path="/public" label="Public" />
      {isAuthenticated && (
        <>
          <NavBarTab path="/protected" label="Protected" />
          <NavBarTab path="/admin" label="Admin" />
        </>
      )}
    </div>
  );
};
