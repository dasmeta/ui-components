import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";

type RedirectLinkProps = {
  route: string;
  title: string;
};
export const NavigationLink = (props: RedirectLinkProps): React.JSX.Element => {
  const navigate = useNavigate();
  const { route, title } = props;

  return (
    <Typography.Link
      onClick={() => {
        navigate(route, { replace: true });
      }}
    >
      {title}
    </Typography.Link>
  );
};
