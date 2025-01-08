import React from "react";
import Login from "@/components/auth/Login";
import { formatTitle } from "@/helpers/helpers";

// Define the metadata for the page, including the title
export const metadata = {
    title: formatTitle("Login"),
};

// The LoginPage component, which renders the Login component
const LoginPage = () => {
    return <Login />;
};

export default LoginPage;
