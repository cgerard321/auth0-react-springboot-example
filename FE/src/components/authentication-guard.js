import React from "react";
import {withAuthenticationRequired} from "react-oidc-context";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {});

    return <Component />;
};
