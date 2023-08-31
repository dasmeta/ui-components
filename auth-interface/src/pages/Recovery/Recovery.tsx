import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Col, Form, Input, notification, Row, Spin, Typography } from "antd";
import { RecoveryFlow } from "@ory/client";
import { sdk, sdkError } from "../../sdk";
import { NavigationLink } from "../../components/Common/NavigationLink";
import { EmailFormItem } from "../../components/Form/EmailFormItem";
import { Logo } from "../../components/Logo/Logo";

type RecoveryDataType = {
  csrf_token: string;
  method: string;
  email?: string;
  code?: string;
};

type RecoveryProps = {
  logo?: string;
  title?: string;
  loginRoute?: string;
  authSystem?: "ory" | "auth0";
  cardWidth?: number;
  host: string;
};

type RecoveryFormDataType = {
  email: string;
  code: string;
};

export const Recovery = (props: RecoveryProps): React.JSX.Element => {
  const [flow, setFlow] = useState<RecoveryFlow | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const [email, setEmail] = useState("");
  const [csrf, setCsrf] = useState("");

  const { logo, title = "Recover your account", loginRoute = "/login", cardWidth = 560, host } = props;

  const navigate = useNavigate();

  const getFlow = useCallback(
    (flowId: string) =>
      sdk(host)
        .getRecoveryFlow({ id: flowId })
        .then(({ data: flow }) => setFlow(flow))
        .catch(sdkErrorHandler),
    []
  );

  const sdkErrorHandler = sdkError(getFlow, setFlow, "/recovery");

  const createFlow = () => {
    sdk(host)
      .createBrowserRecoveryFlow()
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

  const onFinish = (values: RecoveryFormDataType) => {
    // @ts-ignore
    const csrfToken = (flow?.ui.nodes.find((node) => node.attributes.name === "csrf_token")).attributes.value;
    const data: RecoveryDataType = {
      method: "code",
      csrf_token: csrfToken
    };
    if (values.code) {
      data.code = values.code;
    } else {
      data.email = values.email;
      setCsrf(csrfToken);
      setEmail(values.email);
    }

    recover(data);
  };

  const resendCode = () => {
    const data = {
      email,
      method: "code",
      csrf_token: csrf
    };
    recover(data);
  };

  const recover = (data: RecoveryDataType) => {
    const url = `${host}/self-service/recovery?flow=${flow?.id}`;

    axios
      .post(url, data, {
        withCredentials: true
      })
      .then((res) => {
        if (data.email) {
          const [message] = res.data.ui.messages;
          setRecoveryMessage(message.text);

          notification.success({
            message: "Recovery code sent",
            description: "Please check your email."
          });
        }
      })
      .catch((err) => {
        const redirect = err.response.data.redirect_browser_to;
        if (data.code && redirect) {
          navigate(redirect.substring(3), { replace: true });
          window.location.reload();
        } else {
          const [message] = err.response.data.ui.messages;

          notification.error({
            message: message.text,
            description: "Please check the form fields for errors."
          });
        }
      });
  };

  return flow ? (
    <Card bordered={true} style={{ width: cardWidth }}>
      {recoveryMessage && (
        <Row justify="center">
          <Typography.Text strong={true}>{recoveryMessage}</Typography.Text>
        </Row>
      )}
      {logo && <Logo src={logo} />}

      <Row justify="center">
        <Typography.Title level={3}>{title}</Typography.Title>
      </Row>
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off" layout="vertical">
        {recoveryMessage ? (
          <Form.Item
            label="Recovery code"
            name="code"
            rules={[{ required: true, message: "Please input the recovery code!" }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <EmailFormItem />
        )}

        <Form.Item>
          <Row justify="center" gutter={[12, 12]}>
            {recoveryMessage && (
              <Col span={24}>
                <Button type="primary" htmlType="button" onClick={resendCode} block>
                  Resend Code
                </Button>
              </Col>
            )}
            <Col span={24}>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Col>
            <Col>
              <NavigationLink route={loginRoute} title={"Back to login"} />
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
