import React from "react";
import { Row } from "antd";
import "./Logo.css";

type LogoProps = {
  src: string;
};
export const Logo = (props: LogoProps): React.JSX.Element => {
  const { src } = props;
  return (
    <Row justify="center">
      <img src={src} className="logo" alt="logo" />
    </Row>
  );
};
