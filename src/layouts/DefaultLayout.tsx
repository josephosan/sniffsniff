import React, {useState} from "react";

import {Outlet} from "react-router-dom";
import {Button, Drawer, Layout} from "antd";
import {useApp} from "../store/app.store";
import {Sidebar} from "../components/primary/Sidebar";
import {appConfig} from "../config/app.config";

const {Sider, Header, Content} = Layout;
export const DefaultLayout: React.FC = () => {
    const {isMobile, theme} = useApp();
    const [phoneSidebarOpen, setPhoneSidebarOpen] = useState<boolean>(false);

    return (
        <Layout style={{
            width: "100%",
            height: "100vh"
        }}>
            {
                isMobile ?
                    <Drawer
                        placement="right"
                        open={phoneSidebarOpen}
                        closable={false}
                        width={appConfig.sidebarWidth}
                        maskClosable={true}
                        maskStyle={{
                            opacity: '0'
                        }}
                        keyboard={true}
                        onClose={() => setPhoneSidebarOpen(false)}
                    >
                        <Sidebar/>
                    </Drawer>
                    :
                    <Sider
                        className="sidebar"
                        breakpoint={"lg"}
                        collapsedWidth={0}
                        trigger={null}
                        style={{
                            padding: isMobile ? 0 : `${appConfig.defaultPadding}px ${appConfig.defaultPadding}px ${appConfig.defaultPadding}px 0`,
                            backgroundColor: "inherit"
                        }}
                    >
                        <div
                            className={"h-100 w-100 p-3"}
                            style={{
                                backgroundColor: theme.cardBg,
                                borderRadius: appConfig.defaultBorderRadius
                            }}
                        >
                            <Sidebar/>
                        </div>
                    </Sider>
            }
            <Layout>
                <Header
                    style={{
                        backgroundColor: "inherit"
                    }}
                >
                    <Button onClick={() => setPhoneSidebarOpen(true)}>sidebarToggle</Button>
                </Header>
                <Content
                    className={"d-flex justify-content-center"}
                    style={{
                        padding: appConfig.defaultPadding + "px",
                    }}
                >
                    <div
                        className={"w-100 h-100 p-3"}
                        style={{
                            backgroundColor: theme.cardBg,
                            borderRadius: appConfig.defaultBorderRadius,
                            maxWidth: "1300px"
                        }}
                    >
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}