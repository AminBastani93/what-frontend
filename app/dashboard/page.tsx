import React from "react";
import { formatTitle } from "@/helpers/helpers";
import Dashboard from "@/components/dashboard/Dashboard";

// Define the metadata for the page, including the title
export const metadata = {
    title: formatTitle("Dashboard"),
};

// The DashboardPage component, which renders the Dashboard component
const DashboardPage = () => {
    return <Dashboard />;
};

export default DashboardPage;
