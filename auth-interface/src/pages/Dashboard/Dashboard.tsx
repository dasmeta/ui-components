import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Session } from "@ory/client";
import { Typography } from "@ory/elements";
import { sdk, sdkError } from "../../sdk";

type DashboardProps = {
  host: string;
};

export const Dashboard = (props: DashboardProps): React.JSX.Element => {
  const [session, setSession] = useState<Session | null>(null);
  const [logoutUrl, setLogoutUrl] = useState<string>();

  const navigate = useNavigate();
  const { host } = props;
  const sdkErrorHandler = sdkError(undefined, undefined, "/login");

  const createLogoutFlow = () => {
    sdk(host)
      .createBrowserLogoutFlow(undefined, {
        params: {
          return_url: "/"
        }
      })
      .then(({ data }) => setLogoutUrl(data.logout_url))
      .catch(sdkErrorHandler);
  };

  useEffect(() => {
    sdk(host)
      .toSession()
      .then(({ data: session }) => {
        setSession(session);
        createLogoutFlow();
      })
      .catch(sdkErrorHandler)
      .catch((error) => {
        if (error.message) {
          return navigate(`/error?error=${encodeURIComponent(error.message)}`, {
            replace: true
          });
        }

        navigate(`/error?error=${encodeURIComponent(JSON.stringify(error))}`, {
          replace: true
        });
      });
  }, []);

  return (
    <>
      <Typography size={"headline37"}>Welcome to the dashboard!</Typography>
      <Typography size={"headline21"}>
        {session?.identity.traits.firstName} you can logout here: {/* Allow the user to logout */}
        <a href={logoutUrl}>Logout</a> or go to your settings page here: <a href="/settings">Settings</a>
      </Typography>
    </>
  );
};
