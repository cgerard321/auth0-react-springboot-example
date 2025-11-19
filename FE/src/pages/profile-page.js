import React from "react";
import {CodeSnippet} from "../components/code-snippet";
import {PageLayout} from "../components/page-layout";
import {useAuth} from "react-oidc-context";

export const ProfilePage = () => {
    const {user} = useAuth();


    const decodeJwt = (token) => {
        try {
            const payloadBase64 = token.split(".")[1]
                .replace(/-/g, "+")
                .replace(/_/g, "/");
            const jsonPayload = atob(payloadBase64);
            return JSON.parse(jsonPayload);
        } catch {
            return null;
        }
    };

    if (!user) {
        return null;
    }

    const decodeJWT = async () => {
        const accessToken = user.access_token

        if (!accessToken) {
            return null
        }

        const base64 = window.atob(accessToken.split('.')[1])

        return JSON.parse(base64)

    }

    const permissions = decodeJwt(user.access_token)?.permissions || [];

    //Log user id
    console.log(decodeJWT().then((accessToken) => {
        console.log(accessToken)
    }))

    console.log(user.sub)
    return (
        <PageLayout>
            <div className="content-layout">
                <h1 id="page-title" className="content__title">
                    Profile Page
                </h1>
                <div className="content__body">
                    <p id="page-description">
            <span>
              You can use the <strong>ID Token</strong> to get the profile
              information of an authenticated user.
            </span>
                        <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
                    </p>
                    <div className="profile-grid">
                        <div className="profile__header">
                            <img
                                src={user.profile.picture}
                                alt="Profile"
                                className="profile__avatar"
                            />
                            <div className="profile__headline">
                                <h2 className="profile__title">{user.profile.name}</h2>
                                <span className="profile__description">{user.profile.email}</span>
                                {/*Get roles in access token*/}
                                <span className="profile__description">
  <strong>Permissions: </strong>
                                    {permissions.length ? permissions.join(", ") : "None"}
</span>
                            </div>
                        </div>
                        <div className="profile__details">
                            <CodeSnippet
                                title="Decoded User obj"
                                code={JSON.stringify(user, null, 2)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};
