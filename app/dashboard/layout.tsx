"use client";
import React, { useEffect, useState } from "react";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Flex, Dropdown, Space, Button, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import { cookie_options } from "@/helpers/helpers";
import { decodeJwt } from "jose";

const { Header, Content } = Layout;

const RootLayout = ({ children }: React.PropsWithChildren) => {
    // State for storing user's email
    const [userEmail, setUserEmail] = useState<string>("");

    // Router instance for navigation
    const router = useRouter();

    // Function to retrieve user information from the access token
    const getUserInfo = () => {
        const cookies = parseCookies();
        const token = cookies["access_token"];
        const { email } = decodeJwt(token) as { email: string };
        setUserEmail(email);
    };

    // Call getUserInfo on component mount
    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        // Main layout container
        <Layout style={{ minHeight: "100vh" }}>
            <Header
                style={{
                    padding: "20px",
                    boxShadow: "rgba(200, 208, 216, 0.3) 0px 0px 30px 0px",
                }}
            >
                <Flex style={{ height: "100%" }} justify="flex-end" align="center">
                    <Flex align="center">
                        <Dropdown
                            arrow
                            menu={{
                                items: [
                                    {
                                        label: (
                                            <Link
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    destroyCookie(
                                                        null,
                                                        "access_token",
                                                        cookie_options
                                                    );
                                                    localStorage.removeItem(
                                                        "selectedRows"
                                                    );
                                                    localStorage.removeItem("searchTerm");
                                                    localStorage.removeItem("products");
                                                    router.push(`/login`);
                                                }}
                                            >
                                                <LogoutOutlined
                                                    style={{ marginRight: 5 }}
                                                />{" "}
                                                Logout
                                            </Link>
                                        ),
                                        key: "usermenu-1",
                                    },
                                ],
                            }}
                            trigger={["click"]}
                        >
                            <Button onClick={(e) => e.preventDefault()} size="large">
                                <Space>
                                    {userEmail ? userEmail : <Spin />} <UserOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </Flex>
                </Flex>
            </Header>
            <Content
                style={{
                    padding: 40,
                }}
            >
                {children}
            </Content>
        </Layout>
    );
};

export default RootLayout;
