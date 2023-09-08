import React from "react";
import { Typography } from "antd";
import useNavigate from "../../hooks/useNavigate";

type RedirectLinkProps = {
  route: string;
  title: string;
  onClick?: (route: string) => void;
};
export const NavigationLink = (props: RedirectLinkProps): React.JSX.Element => {
  const navigate = useNavigate();
  const { title, route, onClick = () => {} } = props;

  return (
    <Typography.Link
      onClick={() => onClick(route)}
    >
      {title}
    </Typography.Link>
  );
};
