import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = (props: WrapperProps): React.JSX.Element => {
  const { children } = props;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      {children}
    </div>
  );
};
