import React from "react";
import { formatTitle } from "@/helpers/helpers";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata = {
    title: formatTitle("Dashboard"),
};

const DashboardPage = () => {
    return <Dashboard />;
};

export default DashboardPage;
