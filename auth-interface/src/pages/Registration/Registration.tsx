import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Col, Form, notification, Row, Spin, Typography } from "antd";
import { RegistrationFlow } from "@ory/client";
import { sdk, sdkError } from "../../sdk";
import { NavigationLink } from "../../components/Common/NavigationLink";
import { EmailFormItem } from "../../components/Form/EmailFormItem";
import { PasswordFormItem } from "../../components/Form/PasswordFormItem";
import { Logo } from "../../components/Logo/Logo";

type RegistrationPropsType = {
  logo?: string;
  title?: string;
  loginRoute?: string;
  authSystem?: "ory" | "auth0";
  cardWidth?: number;
  host: string;
};

type RegistrationFormDataType = {
  email: string;
  password: string;
};

export const Registration = (props: RegistrationPropsType): React.JSX.Element => {
  const [flow, setFlow] = useState<RegistrationFlow | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { logo, title = "Register new account", loginRoute = "/login", cardWidth = 560, host } = props;
  const navigate = useNavigate();

  const getFlow = useCallback(
    (flowId: string) =>
      sdk(host)
        .getRegistrationFlow({ id: flowId })
        .then(({ data: flow }) => setFlow(flow))
        .catch(sdkErrorHandler),
    []
  );

  const sdkErrorHandler = sdkError(getFlow, setFlow, "/registration", true);

  const createFlow = () => {
    sdk(host)
      .createBrowserRegistrationFlow()
      .then(({ data: flow }) => {
        setSearchParams({ flow: flow.id });
        setFlow(flow);
      })
      .catch(sdkErrorHandler);
  };

  useEffect(() => {
    const flowId = searchParams.get("flow");

    if (flowId) {
      getFlow(flowId).catch(createFlow);
      return;
    }

    createFlow();
  }, []);

  const onFinish = (values: RegistrationFormDataType) => {
    // @ts-ignore
    const csrfToken = (flow?.ui.nodes.find((node) => node.attributes.name === "csrf_token")).attributes.value;

    const url = `${host}/self-service/registration?flow=${flow?.id}`;
    const data = {
      traits: {
        email: values.email
      },
      password: values.password,
      method: "password",
      csrf_token: csrfToken
    };

    axios
      .post(url, data, {
        withCredentials: true
      })
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        const [message] = err.response.data.ui.messages;

        notification.error({
          message: message.text,
          description: "Please check the form fields for errors."
        });
      });
  };

  return flow ? (
    <Card bordered={true} style={{ width: cardWidth }}>
      {logo && <Logo src={logo} />}
      <Row justify="center">
        <Typography.Title level={3}>{title}</Typography.Title>
      </Row>
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off" layout="vertical">
        <EmailFormItem />
        <PasswordFormItem />

        <Form.Item>
          <Row justify="center" gutter={[12, 12]}>
            <Col span={24}>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Col>
            <Col>
              <NavigationLink route={loginRoute} title={"Sign In"} />
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  ) : (
    <Spin size="large">
      <div className="content" />
    </Spin>
  );
};
