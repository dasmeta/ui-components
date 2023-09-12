import React from "react";
import { message } from "antd";
import axios from "axios";
import { AuthMethods, ConfigProps } from "../types";
import { Flow } from "../constants";
import { LoginForm } from "../components/Strapi/LoginForm";
import { StrapiLoginFormBody } from "../components/Strapi/types";

function useStrapiAuth(config: ConfigProps, flowType: Flow): AuthMethods {
  const handleSubmit = async (values: StrapiLoginFormBody): Promise<void> => {
    axios
      .post(`${config.host}/auth/local`, {
        identifier: values.identifier,
        password: values.password
      })
      .then((res) => {
        if (config.onLoginSuccess) {
          config.onLoginSuccess(res.data);
        }
      })
      .catch((err) => {
        console.log(err, "err");
        if (config.onLoginFail) {
          config.onLoginFail(err);
        }
      });
  };

  const renderForm = () => {
    return <LoginForm handleSubmit={handleSubmit} />;
  };

  return {
    loading: false,
    handleSubmit,
    renderForm
  };
}

export default useStrapiAuth;
