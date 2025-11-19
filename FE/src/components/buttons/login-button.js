import React from "react";
import {useAuth} from "react-oidc-context";

export const LoginButton = () => {
  const { signinRedirect } = useAuth();

  const handleLogin = async () => {
    await signinRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <button className="button__login" onClick={handleLogin}>
      Log In
    </button>
  );
};
