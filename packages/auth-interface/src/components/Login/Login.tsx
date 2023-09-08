import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Form, Row, Spin, Typography } from "antd";
import { LoginFlow, UiNode } from "@ory/client";
import { AuthContext } from "../../contexts/AuthContext";
import useSearchParams from "../../hooks/useSearchParams";
import useNavigate from "../../hooks/useNavigate";
import { NavigationLink } from "../../components/Common/NavigationLink";
import { EmailFormItem } from "../../components/Form/EmailFormItem";
import { PasswordFormItem } from "../../components/Form/PasswordFormItem";
import { Logo } from "../../components/Logo/Logo";
import useAuth from "../../hooks/useAuth";
import { Flow } from "../../constants";

type LoginFormDataType = {
  email: string;
  password: string;
};

// type LoginDataType = {
//   identifier: string;
//   password: string;
//   method: string;
//   csrf_token: string;
// };

type LoginPropsType = {
  logo?: string;
  title?: string;
  registrationRoute?: string;
  passwordResetRoute?: string;
  authSystem?: "ory" | "auth0";
  cardWidth?: number;
  host: string;
  onRegistrationClick?: (route: string) => void;
};

export const Login = (props: LoginPropsType): React.JSX.Element => {
  const {
    logo,
    title = "Login to your account",
    registrationRoute = "/registration",
    passwordResetRoute = "/recovery",
    cardWidth = 560,
    onRegistrationClick = () => {}
  } = props;

  const { loading, handleSubmit, renderForm } = useAuth(Flow.SIGNIN);

  const onFinish = (values: LoginFormDataType) => {
    handleSubmit(values);
  };

  return !loading ? (
    <Card bordered={true} style={{ width: cardWidth }}>
      {logo && <Logo src={logo} />}
      <Row justify="center">
        <Typography.Title level={3}>{title}</Typography.Title>
      </Row>
      { renderForm ? renderForm() : (
        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="on" layout="vertical">
          <EmailFormItem />
          <PasswordFormItem />

          <Form.Item>
            <Row justify="end">
              <NavigationLink route={passwordResetRoute} title={"Forgot Password"} />
            </Row>
          </Form.Item>

          <Form.Item>
            <Row justify="center" gutter={[12, 12]}>
              <Col span={24}>
                <Button type="primary" htmlType="submit" block>
                  Sign in
                </Button>
              </Col>
              <Col>
                <NavigationLink
                  route={registrationRoute} 
                  title={"Sign Up"}
                  onClick={onRegistrationClick}
                />
              </Col>
            </Row>
          </Form.Item>
      </Form>
      )}
    </Card>
  ) : (
    <Spin size="large">
      <div className="content" />
    </Spin>
  );
};
