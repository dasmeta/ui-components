import React from "react";
import "./Logo.css";

type LogoProps = {
  src: string;
};
export const Logo = (props: LogoProps): React.JSX.Element => {
  const { src } = props;
  return <img src={src} className="logo" alt="logo" />;
};
