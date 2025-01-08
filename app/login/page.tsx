import React from "react";
import Login from "@/components/auth/Login";
import { formatTitle } from "@/helpers/helpers";

export const metadata = {
    title: formatTitle("Login"),
};

const LoginPage = () => {
    return <Login />;
};

export default LoginPage;
