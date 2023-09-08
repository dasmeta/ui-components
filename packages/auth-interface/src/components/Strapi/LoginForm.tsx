import React, { useContext } from "react";
import { Button, Form, Input } from "antd";
import { StrapiLoginFormBody } from "./types";
import { checkWhitespaces } from "../../utils/validation";
import { AuthContext } from "../../contexts/AuthContext";

type LoginFormProps = {
  handleSubmit: (data: StrapiLoginFormBody) => Promise<void>
};

export const LoginForm = (props: LoginFormProps): React.JSX.Element => {
  const {
   handleSubmit = () => {}
  } = props;

  const { translate } = useContext(AuthContext);

  const onFinish = (values: StrapiLoginFormBody) => {
    handleSubmit(values);
  };

  return (
    <Form 
        name="strapi-form" 
        onFinish={onFinish} 
        autoComplete="on" 
        layout="vertical"
    >
        <Form.Item
            label={translate('username')}
            name="identifier"
            rules={[
                { required: true, message: translate('required-field') },
                { validator: checkWhitespaces },
            ]}
            >
            <Input />
        </Form.Item>
        <Form.Item
            label={translate('password')}
            name="password"
            rules={[
                { required: true, message: translate('required-field') }, 
                { validator: checkWhitespaces }
            ]}
        >
            <Input.Password />
        </Form.Item>
        <Form.Item>
            <Button block type="primary" htmlType="submit">{translate('sign-in')}</Button>
        </Form.Item>
    </Form>
  )
};
