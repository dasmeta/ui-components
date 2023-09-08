// import React, { useCallback, useEffect, useState } from "react";
// import { Button, Card, Form, notification, Spin } from "antd";
// import axios from "axios";
// import { SettingsFlow } from "@ory/client";
// import { gridStyle } from "@ory/elements";
// import { identity, sdk, sdkError } from "../../oryClient";
// import useSearchParams from "../../hooks/useSearchParams";
// import { EmailFormItem } from "../../components/Form/EmailFormItem";
// import { PasswordFormItem } from "../../components/Form/PasswordFormItem";
// import { NavigationLink } from "../../components/Common/NavigationLink";

// type ProfileChangeDataType = {
//   csrf_token: string;
//   method: "password" | "profile";
//   password?: string;
//   traits?: {
//     email: string;
//   };
// };

// type SettingsProps = {
//   host: string;
//   accessToken: string;
// };

// type ProfileUpdateFormDataType = {
//   email: string;
//   password: string;
// };

// export const Settings = (props: SettingsProps): React.JSX.Element => {
//   const [flow, setFlow] = useState<SettingsFlow | null>(null);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();

//   const { host, accessToken } = props;

//   const getFlow = useCallback(
//     (flowId: string) =>
//       sdk(host)
//         .getSettingsFlow({ id: flowId })
//         .then(({ data: flow }) => setFlow(flow))
//         .catch(sdkErrorHandler),
//     []
//   );
//   const sdkErrorHandler = sdkError(getFlow, setFlow, "/settings", true);

//   const createFlow = () => {
//     sdk(host)
//       .createBrowserSettingsFlow()
//       .then(({ data: flow }) => {
//         setSearchParams({ flow: flow.id });
//         setFlow(flow);
//       })
//       .catch(sdkErrorHandler);
//   };

//   useEffect(() => {
//     const flowId = searchParams.get("flow");

//     if (flowId) {
//       getFlow(flowId).catch(createFlow); // if for some reason the flow has expired, we need to get a new one
//       return;
//     }

//     createFlow();
//   }, []);

//   // todo need to check eslint and fix it for rules
//   const onFinish = async (values: ProfileUpdateFormDataType) => {
//     // @ts-ignore
//     const csrfToken = (flow?.ui.nodes.find((node) => node.attributes.name === "csrf_token")).attributes.value;
//     const url = `${host}/self-service/settings?flow=${flow?.id}`;
//     const data: ProfileChangeDataType = {
//       method: "profile",
//       csrf_token: csrfToken
//     };
//     if (values.email) {
//       data.traits = {
//         email: values.email
//       };
//     } else {
//       data.method = "password";
//       data.password = values.password;
//     }

//     setLoading(true);

//     sdk(host)
//       .toSession()
//       .then((session) => {
//         identity(host, accessToken).extendSession({
//           id: session.data.id
//         });
//       })
//       .catch((err) => {
//         console.log({ err });
//       });

//     axios
//       .post(url, data, {
//         withCredentials: true
//       })
//       .then((res) => {
//         console.log({ res });
//         notification.success({
//           message: values.email ? "Email changed successfully" : "Password changed successfully"
//         });

//         setLoading(false);
//       })
//       .catch((err) => {
//         setLoading(false);
//         let reason: string, message: string;
//         if (data.method === "profile") {
//           message = err.response.data.error.message;
//           reason = err.response.data.error.reason;
//         } else {
//           message = err.response.statusText;

//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           reason = err.response.data.ui.nodes.find((item: any) => item.group === "password" && item.messages.length)
//             .messages[0].text;
//         }
//         console.log({ err });
//         notification.error({
//           message: message,
//           description: reason
//         });
//       });
//   };

//   return flow ? (
//     <div className={gridStyle({ gap: 16 })}>
//       <NavigationLink route={"/"} title={"Dashboard"} />

//       <Card>
//         <Form
//           form={form}
//           name="email"
//           autoComplete="off"
//           onFinish={onFinish}
//           layout="vertical"
//           initialValues={{
//             email: flow.identity.traits.email
//           }}
//         >
//           <EmailFormItem />
//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={loading}>
//               Save
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//       <Card>
//         <Form name="password" autoComplete="off" onFinish={onFinish} layout="vertical">
//           <PasswordFormItem />
//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={loading}>
//               Save
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   ) : (
//     <Spin size="large">
//       <div className="content" />
//     </Spin>
//   );
// };
