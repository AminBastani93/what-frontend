"use client";
import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Card, Flex, Form, Input, message } from "antd";
import { useSearchParams, useRouter } from "next/navigation";

type FieldType = {
    username: string;
    pass: string;
};

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const searchParams = useSearchParams();

    const redirect = searchParams.get("redirect");

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {};

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
                        <Form.Item<FieldType>
                            label="Email or phone"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email or phone!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Password"
                            name="pass"
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
