import { ReactElement } from "react";

export type LoginResponse = {
    user: {[key: string]: any},
    jwt?: string
}

export type AuthMethods = {
    loading?: boolean;
    handleSubmit: (data: any) => Promise<void>;
    renderForm?: () => React.ReactElement | null;
}

export type ConfigProps = {
    host: string;
    onLoginSuccess?: (data: LoginResponse) => void;
    onLoginFail?: (message: string) => void;
}

export type TranslationsProps = Partial<{
    'username': ReactElement | string;
    'password': ReactElement | string;
    'sign-in': ReactElement | string;
    'required-field': ReactElement | string;
}>
  
  