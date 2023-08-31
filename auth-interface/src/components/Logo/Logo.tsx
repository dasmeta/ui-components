import React from "react";
import { Row } from "antd";
import styles from "./Logo.module.css";

type LogoProps = {
  src: string;
};
export const Logo = (props: LogoProps): React.JSX.Element => {
  const { src } = props;
  return (
    <Row justify="center">
      <img src={src} className={styles.logo} alt="logo" />
    </Row>
  );
};
