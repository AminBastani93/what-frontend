"use client";
import { Card, Flex, Input, message, Table } from "antd";

const Dashboard = () => {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
            <Card title="Products">
                <Flex vertical gap="large">
                    <Input size="large" placeholder="Search" />
                    <Table />
                </Flex>
            </Card>
        </>
    );
};

export default Dashboard;
