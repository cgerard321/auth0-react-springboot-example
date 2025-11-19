import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import {getAdminResource, postAddRole,} from "../services/message.service";
import {useAuth} from "react-oidc-context";

export const AdminPage = () => {
  const [message, setMessage] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = user.access_token;
      const { data, error } = await getAdminResource(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [user]);

    const addRole = async (event) => {
        event.preventDefault();
      const accessToken = user.access_token;
      const { data, error } = await postAddRole(accessToken, event.target.userId.value);

        if (data) {
            setMessage(JSON.stringify(data, null, 2));
        }

    }

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Admin Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves an <strong>admin message</strong> from an
              external API.
            </span>
            <span>
              <strong>
                Only authenticated users with the{" "}
                <code>read:admin-messages</code> permission should access this
                page.
              </strong>
            </span>
          </p>
          <CodeSnippet title="Admin Message" code={message} />
        </div>
      </div>
      <div>
        <form onSubmit={addRole}>POST
            <label>Enter the user ID</label>
            <input type="text" name="userId"/>
            <button type="submit">Send a POST request to /api/messages/admin</button>
        </form>
      </div>
    </PageLayout>
  );
};
