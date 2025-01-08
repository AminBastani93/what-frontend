"use client";
// Import necessary dependencies
import { productsSearch } from "@/helpers/api";
import { Card, Flex, Input, message, Table } from "antd";
import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";

const Dashboard = () => {
    // Initialize state management hooks
    const [messageApi, contextHolder] = message.useMessage();
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // Load saved state from localStorage on component mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedSearchTerm = localStorage.getItem("searchTerm");
            const savedProducts = localStorage.getItem("products");
            const savedSelectedRows = localStorage.getItem("selectedRows");

            if (savedSearchTerm) setSearchTerm(savedSearchTerm);
            if (savedProducts) setProducts(JSON.parse(savedProducts));
            if (savedSelectedRows) setSelectedRowKeys(JSON.parse(savedSelectedRows));
        }
    }, []);

    // Handle product search API call
    const handleSearch = async (value: string) => {
        setLoading(true);
        const response = await productsSearch("?search=" + value);
        setProducts(response.data);
        localStorage.setItem("products", JSON.stringify(response.data));
        setLoading(false);
    };

    // Debounced search effect
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) {
                handleSearch(searchTerm);
            } else {
                // Clear data when search is empty
                localStorage.removeItem("products");
                localStorage.removeItem("selectedRows");
                setSelectedRowKeys([]);
                setProducts([]);
            }
        }, 500);

        // Cleanup timeout on component unmount or searchTerm change
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // Table column definitions with sorting
    const columns: TableProps["columns"] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            sorter: (a, b) => a.description.localeCompare(b.description),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price: string) => `${price}`,
            sorter: (a, b) => parseFloat(a.price) - parseFloat(b.price),
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
            sorter: (a, b) => a.stock - b.stock,
        },
    ];

    // Row selection configuration
    const rowSelection = {
        selectedRowKeys,
        onChange: (selected: React.Key[]) => {
            setSelectedRowKeys(selected);
            localStorage.setItem("selectedRows", JSON.stringify(selected));
        },
    };

    // Render dashboard component
    return (
        <>
            {contextHolder}
            <Card title="Products">
                <Flex vertical gap="large">
                    {/* Search input with persistence */}
                    <Input
                        prefix={<SearchOutlined />}
                        size="large"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => {
                            localStorage.setItem("searchTerm", searchTerm);
                            setSearchTerm(e.target.value);
                        }}
                    />
                    {/* Products table with selection and horizontal scroll */}
                    <Table
                        rowSelection={rowSelection}
                        pagination={false}
                        loading={loading}
                        dataSource={products}
                        columns={columns}
                        rowKey="id"
                        scroll={{ x: 800 }}
                    />
                </Flex>
            </Card>
        </>
    );
};

export default Dashboard;
