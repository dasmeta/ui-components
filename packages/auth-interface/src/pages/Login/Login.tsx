// import React, { useCallback, useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Card, Col, Form, Row, Spin, Typography } from "antd";
// import { LoginFlow, UiNode } from "@ory/client";
// import { sdk, sdkError } from "../../oryClient";
// import useSearchParams from "../../hooks/useSearchParams";
// import useNavigate from "../../hooks/useNavigate";
// import { NavigationLink } from "../../components/Common/NavigationLink";
// import { EmailFormItem } from "../../components/Form/EmailFormItem";
// import { PasswordFormItem } from "../../components/Form/PasswordFormItem";
// import { Logo } from "../../components/Logo/Logo";

// type LoginFormDataType = {
//   email: string;
//   password: string;
// };

// type LoginDataType = {
//   identifier: string;
//   password: string;
//   method: string;
//   csrf_token: string;
// };

// type LoginPropsType = {
//   logo?: string;
//   title?: string;
//   registrationRoute?: string;
//   passwordResetRoute?: string;
//   authSystem?: "ory" | "auth0";
//   cardWidth?: number;
//   host: string;
//   onRegistrationClick?: (route: string) => void;
// };

// export const Login = (props: LoginPropsType): React.JSX.Element => {
//   const [flow, setFlow] = useState<LoginFlow | null>(null);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const {
//     logo,
//     title = "Login to your account",
//     registrationRoute = "/registration",
//     passwordResetRoute = "/recovery",
//     cardWidth = 560,
//     host,
//     onRegistrationClick = () => {}
//   } = props;

//   const navigate = useNavigate();

//   const getFlow = useCallback(
//     (flowId: string) =>
//       sdk(host)
//         .getLoginFlow({ id: flowId })
//         .then(({ data: flow }) => setFlow(flow))
//         .catch(sdkErrorHandler),
//     []
//   );

//   const sdkErrorHandler = sdkError(getFlow, setFlow, "/login", true);

//   const createFlow = () => {
//     const aal2 = searchParams.get("aal2");
//     sdk(host)
//       .createBrowserLoginFlow({ aal: aal2 ? "aal2" : "aal1" })
//       .then(({ data: flow }) => {
//         setSearchParams({ flow: flow.id });
//         setFlow(flow);
//       })
//       .catch(sdkErrorHandler);
//   };

//   useEffect(() => {
//     const flowId = searchParams.get("flow");

//     if (flowId) {
//       getFlow(flowId).catch(createFlow);
//       return;
//     }

//     createFlow();
//   }, []);

//   const onFinish = (values: LoginFormDataType) => {
//     // @ts-ignore
//     const csrfToken = (flow?.ui.nodes.find((node: UiNode) => node.attributes.name === "csrf_token")).attributes.value;

//     const url = `${host}/self-service/login?flow=${flow?.id}`;
//     const data: LoginDataType = {
//       identifier: values.email,
//       password: values.password,
//       method: "password",
//       csrf_token: csrfToken
//     };

//     axios
//       .post(url, data, {
//         withCredentials: true
//       })
//       .then((res) => {
//         console.log({ res });
//         navigate("/", { replace: true });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return flow ? (
//     <Card bordered={true} style={{ width: cardWidth }}>
//       {logo && <Logo src={logo} />}
//       <Row justify="center">
//         <Typography.Title level={3}>{title}</Typography.Title>
//       </Row>
//       <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="on" layout="vertical">
//         <EmailFormItem />
//         <PasswordFormItem />

//         <Form.Item>
//           <Row justify="end">
//             <NavigationLink route={passwordResetRoute} title={"Forgot Password"} />
//           </Row>
//         </Form.Item>

//         <Form.Item>
//           <Row justify="center" gutter={[12, 12]}>
//             <Col span={24}>
//               <Button type="primary" htmlType="submit" block>
//                 Sign in
//               </Button>
//             </Col>
//             <Col>
//               <NavigationLink
//                 route={registrationRoute} 
//                 title={"Sign Up"}
//                 onClick={onRegistrationClick}
//               />
//             </Col>
//           </Row>
//         </Form.Item>
//       </Form>
//     </Card>
//   ) : (
//     <Spin size="large">
//       <div className="content" />
//     </Spin>
//   );
// };
