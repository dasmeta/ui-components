import React, { useState, useCallback, useEffect } from "react";
import { LoginFlow, UiNode, UpdateLoginFlowBody } from "@ory/client";
import { AuthMethods, ConfigProps } from "../types";
import { Flow } from "../constants";
import { client, clientError } from "../oryClient";
import useSearchParams from "./useSearchParams";
import { OryForm } from "../components/Ory/OryForm";

function useOryKratosAuth(config: ConfigProps, flowType: Flow): AuthMethods {

    const [flow, setFlow] = useState<LoginFlow | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const oryClient = client(config.host);

    const getFlow = useCallback(
        (flowId: string) =>
            oryClient
                .getLoginFlow({ id: flowId })
                .then(({ data: flow }) => setFlow(flow)),
                // .catch(sdkErrorHandler),
        []
    );

    // const sdkErrorHandler = clientError(getFlow, setFlow, "/login", true);

    const createFlow = () => {
        const aal2 = searchParams.get("aal2");
        oryClient
            .createBrowserLoginFlow({ aal: aal2 ? "aal2" : "aal1" })
            .then(({ data: flow }) => {
                setSearchParams({ flow: flow.id });
                setFlow(flow);
            })
        // .catch(sdkErrorHandler);
    };

    useEffect(() => {
        const flowId = searchParams.get("flow");
    
        if (flowId) {
          getFlow(flowId).catch(createFlow);
          return;
        }
    
        createFlow();
    }, []);

    const handleSubmit = async (credentials: UpdateLoginFlowBody): Promise<void> => {

        oryClient.updateLoginFlow({
            flow: String(flow?.id),
            updateLoginFlowBody: credentials,
        });
    };
    
    const renderForm = () => {
        if(!flow?.id) {
            return null;
        }

        return (
            <OryForm nodes={flow?.ui.nodes} handleSubmit={handleSubmit} />
        )
    }

    return { 
        loading: !flow?.id,
        handleSubmit,
        renderForm 
    }
}
  
export default useOryKratosAuth;