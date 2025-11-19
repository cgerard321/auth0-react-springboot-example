import React from "react";
import {useAuth} from "react-oidc-context";

export const LogoutButton = () => {
    const {signoutRedirect} = useAuth();

    const handleLogout = () => {
        signoutRedirect({
            post_logout_redirect_uri: window.location.origin,
        }).then(r =>
            console.log(r)
        );
    };

    return (
        <button className="button__logout" onClick={handleLogout}>
            Log Out
        </button>
    );
};
