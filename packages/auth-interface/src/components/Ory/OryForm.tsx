import React from "react";
import { Button, Form, Input } from "antd";
import { UiNode, UpdateLoginFlowBody } from "@ory/client";

type OryFormProps = {
  nodes: Array<UiNode>;
  handleSubmit: (data: UpdateLoginFlowBody) => Promise<void>
};

export const OryForm = (props: OryFormProps): React.JSX.Element => {
  const {
   nodes,
   handleSubmit = () => {}
  } = props;


  const onFinish = (values: UpdateLoginFlowBody) => {
    handleSubmit(values);
  };

  return (
    <Form 
        name="ory-form" 
        initialValues={nodes.reduce((acc, node) => {
            // @ts-ignore
            acc[node.attributes.name] = node.attributes.value;
            return acc;
        }, {})} 
        onFinish={onFinish} 
        autoComplete="on" 
        layout="vertical"
    >
        {nodes.map((node: UiNode) => {
            // @ts-ignore
            switch(node.attributes.type) {
                case "text":
                    return (
                        <Form.Item
                            label={node.meta.label?.text}
                            // @ts-ignore
                            name={node.attributes.name}
                            // @ts-ignore
                            required={node.attributes.required}
                        >
                            <Input />
                        </Form.Item> 
                    ) 
                case "password":
                    return (
                        <Form.Item
                            label={node.meta.label?.text}
                            // @ts-ignore
                            name={node.attributes.name}
                        >
                            <Input.Password />
                        </Form.Item> 
                    )
                case "hidden":
                    return (
                        <Form.Item
                            hidden
                            // @ts-ignore
                            name={node.attributes.name}
                        >
                            <Input />
                        </Form.Item> 
                    )
                case "submit":
                    return (
                        <Form.Item
                            // @ts-ignore
                            name={node.attributes.name}
                        >
                            <Button block type="primary" htmlType="submit">{node.meta.label?.text}</Button>
                        </Form.Item>
                    )

            }
        })}
    </Form>
  )
};
