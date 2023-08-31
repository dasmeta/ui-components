import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Wrapper } from "./components/Common/Wrapper";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";
import { Recovery } from "./pages/Recovery/Recovery";
import { Settings } from "./pages/Profile/Settings";
import logo from "./logo.svg";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const host = process.env.REACT_APP_ORY_URL || "http://localhost:4000";
const accessToken = process.env.ACCESS_TOKEN || "token";

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard host={host} />} />
        <Route
          path="/login"
          element={
            <Wrapper>
              <Login logo={logo} host={host} />
            </Wrapper>
          }
        />
        <Route
          path="/registration"
          element={
            <Wrapper>
              <Registration logo={logo} host={host} />
            </Wrapper>
          }
        />
        <Route
          path="/recovery"
          element={
            <Wrapper>
              <Recovery logo={logo} host={host} />
            </Wrapper>
          }
        />
        <Route path="/settings" element={<Settings host={host} accessToken={accessToken} />} />
        {/*<Route path="/verification" element={<Verification />} />*/}
        {/*<Route path="/error" element={<Error />} />*/}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
