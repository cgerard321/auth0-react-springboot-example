import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import {getCustomerProtectedResource, getProtectedResource} from "../services/message.service";
import {useAuth} from "react-oidc-context";

export const ProtectedPage = () => {
  const [message, setMessage] = useState("");
  const [customerMessage, setCustomerMessage] = useState("");


  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = user.access_token;
      const { data, error } = await getProtectedResource(accessToken);

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

    const getCustomerMessage = async () => {
        const accessToken = user.access_token;
        const { data, error } = await getCustomerProtectedResource(accessToken);

        if (!isMounted) {
            return;
        }

        if (data) {
            setCustomerMessage(JSON.stringify(data, null, 2));
        }

        if (error) {
            setCustomerMessage(JSON.stringify(error, null, 2));
        }
        }



    getMessage();
    getCustomerMessage();

    return () => {
      isMounted = false;
    };



  }, [user]);

  return (
      <PageLayout>
        <div className="content-layout">
          <h1 id="page-title" className="content__title">
            Protected Page
          </h1>
          <div className="content__body">
            <p id="page-description">
            <span>
              This page retrieves a <strong>protected message</strong> from an
              external API.
            </span>
              <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
            </p>
            <CodeSnippet title="Protected Message" code={message}/>
          </div>
        </div>
        <div className="content-layout">
          <h1 id="page-title" className="content__title">
            Protected Page
          </h1>
          <div className="content__body">
            <p id="page-description">
            <span>
              This page retrieves a <strong>protected message</strong> from an
              external API.
            </span>
              <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
            </p>
            <CodeSnippet title="Protected Message for customer" code={customerMessage}/>
          </div>
        </div>
      </PageLayout>
  );
};
