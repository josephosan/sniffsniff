import React, {useState} from "react";

import {Outlet} from "react-router-dom";
import {Drawer, Layout} from "antd";
import {Sidebar} from "../components/primary/Sidebar";
import {appConfig} from "../config/app.config";
import {useMediaQuery} from "react-responsive";
import {useApp} from "../store/app.store";
import {AppHeader} from "../components/primary/AppHeader";

const {Sider, Header, Content} = Layout;
export const DefaultLayout: React.FC = () => {
    const isMobile = useMediaQuery({query: `(max-width: ${appConfig.appBreakPoint}px)`});
    const {theme} = useApp();
    const [phoneSidebarOpen, setPhoneSidebarOpen] = useState<boolean>(false);

    return (
        <Layout style={{
            width: "100%",
            height: "100vh",
            backgroundColor: theme.mainBackgroundColor
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
                        style={{
                            backgroundColor: theme.cardBg,
                            borderRadius: theme.defaultBorderRadius
                        }}
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
                            backgroundColor: "inherit",
                        }}
                    >
                        <div
                            className={"h-100 w-100 p-2 custom-shadow"}
                            style={{
                                backgroundColor: theme.cardBg,
                                borderRadius: appConfig.defaultBorderRadius,
                            }}
                        >
                            <Sidebar/>
                        </div>
                    </Sider>
            }
            <Layout
                style={{
                    overflowY: "auto",
                    backgroundColor: theme.mainBackgroundColor
                }}
            >
                <Header
                    className={"d-flex align-items-center mb-2"}
                    style={{
                        backgroundColor: "inherit",
                        padding: `0 ${appConfig.defaultPadding + 15}px 0 ${appConfig.defaultPadding + 15}px`
                    }}
                >
                    <AppHeader isMobile={isMobile} sidebarClick={() => setPhoneSidebarOpen(true)}/>
                </Header>
                <Content
                    className={"d-flex justify-content-center"}
                    style={{
                        padding: appConfig.defaultPadding + "px",
                        minHeight: "auto"
                    }}
                >
                    <div
                        className={"w-100 h-100 p-3 custom-shadow"}
                        style={{
                            backgroundColor: theme.cardBg,
                            borderRadius: appConfig.defaultBorderRadius,
                            maxWidth: "1300px",
                            height: "auto"
                        }}
                    >
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}