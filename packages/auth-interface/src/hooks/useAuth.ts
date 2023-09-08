import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AuthMethods } from "../types";
import { Flow, Provider } from "../constants";
import useOryKratosAuth from "./useOryKratosAuth";
import useAuth0Auth from "./useAuth0Auth";
import useStrapiAuth from "./useStrapiAuth";

function useAuth(flow: Flow): AuthMethods {

    const { provider, config } = useContext(AuthContext);

    let authMethods: AuthMethods;

    switch (provider) {
        case Provider.ORY_KRATOS:
            authMethods = useOryKratosAuth(config, flow);
            break;
        case Provider.AUTH0:
            authMethods = useAuth0Auth();
            break;
        case Provider.STRAPI:
            authMethods = useStrapiAuth(config, flow);
            break;
        default:
            throw new Error("Unsupported authentication method");

    }
    return authMethods;
}

export default useAuth;