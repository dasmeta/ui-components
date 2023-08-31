import React from "react";
import { Form, Input } from "antd";
import { checkWhitespaces } from "../../utils/validation";

export const PasswordFormItem = (): React.JSX.Element => {
  return (
    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: "Please input your password!" }, { validator: checkWhitespaces }]}
    >
      <Input.Password />
    </Form.Item>
  );
};
