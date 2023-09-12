import React, { ReactElement, createContext } from "react";
import { ConfigProps, TranslationsProps } from "../types";
import { Provider } from "../constants";
import { ConfigProvider } from "antd";

const defaultTranslations: TranslationsProps = {
  username: "Username",
  password: "Password",
  "sign-in": "Sign in",
  "required-field": "Field is required"
};

export type ProviderProps = {
  provider: Provider;
  translate?: (key: keyof TranslationsProps, params?: { [key: string]: any }) => ReactElement | string;
  locale?: string;
  config: ConfigProps;
  theme?: {
    colorPrimary?: string;
    borderRadius?: number;
  };
};

const defaultProps: ProviderProps & {
  translate: (key: keyof TranslationsProps, params?: { [key: string]: any }) => ReactElement | string;
} = {
  provider: Provider.ORY_KRATOS,
  translate: (key: keyof TranslationsProps) => defaultTranslations[key] || key,
  locale: "en",
  theme: {},
  config: {
    host: "http://localhost:3000",
    onLoginSuccess: () => {},
    onLoginFail: () => {}
  }
};

export const AuthContext = createContext(defaultProps);

const AuthProvider: React.FC<ProviderProps & { children?: React.ReactNode }> = ({ children, theme, ...props }) => {
  return (
    <AuthContext.Provider value={{ ...defaultProps, ...props }}>
      <ConfigProvider
        theme={{
          token: {
            ...theme
          }
        }}
      >
        {children}
      </ConfigProvider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
