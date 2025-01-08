import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "@/assets/css/main.css";
import { PublicEnvScript } from "next-runtime-env";

export const metadata = {
    title: "What!",
    icons: {
        icon: "/favicon.png",
    },
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <html lang="en">
            <head>
                <PublicEnvScript />
            </head>
            <body>
                <AntdRegistry>
                    <ConfigProvider
                        theme={{
                            token: {
                                fontFamily: "'Plus Jakarta Sans', sans-serif !important",
                            },
                            components: {
                                Layout: {
                                    bodyBg: "#f1f5f9",
                                    headerBg: "#fff",
                                    headerHeight: 90,
                                    siderBg: "#fff",
                                },
                            },
                        }}
                    >
                        {children}
                    </ConfigProvider>
                </AntdRegistry>
            </body>
        </html>
    );
};

export default RootLayout;
