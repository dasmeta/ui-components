import React, { ReactElement, createContext } from 'react';
import useOryKratosAuth from '../hooks/useOryKratosAuth';
import useAuth0Auth from '../hooks/useAuth0Auth';
import { ConfigProps, AuthMethods, TranslationsProps } from '../types';
import { Provider } from '../constants';

const defaultTranslations: TranslationsProps = {
  'username': 'Username',
  'password': 'Password',
  'sign-in': 'Sign in',
  'required-field': 'Field is required'
}

export type ProviderProps = {
  provider: Provider;
  translate?: (
    key: keyof TranslationsProps,
    params?: { [key: string]: any },
  ) => ReactElement | string;
  locale?: string;
  config: ConfigProps
}

const defaultProps: ProviderProps & {
  translate: (
    key: keyof TranslationsProps,
    params?: { [key: string]: any },
  ) => ReactElement | string;
} = {
  provider: Provider.ORY_KRATOS,
  translate: (key: keyof TranslationsProps) => defaultTranslations[key] || key,
  locale: 'en',
  config: {
    host: 'http://localhost:3000',
    onLoginSuccess: () => {},
    onLoginFail: () => {}
  },
};

export const AuthContext = createContext(defaultProps);

const AuthProvider: React.FC<ProviderProps & { children?: React.ReactNode }> = ({ children, ...props }) => {
  return (
    <AuthContext.Provider
      value={{ ...defaultProps, ...props }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
