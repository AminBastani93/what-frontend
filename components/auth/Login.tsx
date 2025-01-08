"use client";
import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Card, Flex, Form, Input, message } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import { LoginType } from "@/helpers/apiTypes";
import { login } from "@/helpers/api";
import { setCookie } from "nookies";
import { cookie_options } from "@/helpers/helpers";

// The Login component, which renders the login form
const Login = () => {
    // Create a message context holder for displaying messages
    const [messageApi, contextHolder] = message.useMessage();

    // Create a loading state for the login button
    const [loading, setLoading] = useState(false);

    // Create a router object for navigation
    const router = useRouter();

    // Get the search parameters from the URL
    const searchParams = useSearchParams();

    // Get the redirect parameter from the search parameters
    const redirect = searchParams.get("redirect");

    // Define the onFinish function for the form
    const onFinish: FormProps<LoginType>["onFinish"] = async (values) => {
        setLoading(true);
        const res = await login({
            email: values.email,
            password: values.password,
        });
        setLoading(false);
        if (res.status == 500) {
            messageApi.error("Server not available.");
        } else if (res.status == 400) {
            messageApi.error(res.data.error);
        } else {
            messageApi.success("Login successfully.");
            setCookie(null, "access_token", res.data.access, cookie_options);
            redirect ? router.push(redirect) : router.push("/dashboard");
        }
    };

    return (
        <>
            {contextHolder}
            <Flex
                style={{
                    padding: 24,
                    minHeight: "100vh",
                }}
                justify={"center"}
                align={"center"}
            >
                <Card>
                    <Flex
                        style={{ fontSize: "2rem", marginBottom: "24px" }}
                        justify="center"
                    >
                        Login form
                    </Flex>
                    <Form
                        name="basic"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                        style={{ minWidth: 400 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item<LoginType>
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<LoginType>
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{ offset: 10, span: 14 }}
                            style={{ marginBottom: 0 }}
                        >
                            <Button loading={loading} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Flex>
        </>
    );
};

export default Login;
