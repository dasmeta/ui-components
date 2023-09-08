import React from "react";
import { Form, Input } from "antd";
import { checkWhitespaces, validateEmail } from "../../utils/validation";

// type EmailFormItemProps = {
//   label?: string;
//   name?: string;
// }

export const EmailFormItem = (): React.JSX.Element => {
  // const { label = "Username", name = "username" } = props

  return (
    <Form.Item
      label="Email"
      name="email"
      rules={[
        { required: true, message: "Please input your username!" },
        { validator: checkWhitespaces },
        { validator: validateEmail }
      ]}
    >
      <Input />
    </Form.Item>
  );
};
