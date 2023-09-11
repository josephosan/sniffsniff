import React from "react";

import AppConfig from "../config/app.config";
import {Outlet} from "react-router-dom";
import {Layout} from "antd";
import {useApp} from "../store/app.store";
import {PhoneBottombar} from "./sidebar/PhoneBottombar";

const {Sider, Content, Footer} = Layout;

export const DefaultLayout: React.FC = () => {
    const {isMobile} = useApp();

    if (isMobile) {
        return (
            <Layout className={"layout-container-phone"}>
                <div
                    style={{
                        backgroundColor: AppConfig.defaultLayoutContentBackgroundColor,
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <Outlet/>
                </div>
                <Footer
                    style={{
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: AppConfig.sidebarBackgroundColor,
                        boxShadow: '0 0 20px 5px rgba(0, 0, 0, 0.1)',
                        padding: '0px',
                        height: '65px'
                    }}
                >
                    <PhoneBottombar/>
                </Footer>
            </Layout>
        );
    } else {
        return (
            <Layout hasSider className={"layout-container-desktop"}>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100%',
                        position: 'relative',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        borderRadius: '0 30px 30px 0',
                        backgroundColor: AppConfig.sidebarBackgroundColor
                    }}
                >
                </Sider>
                <Layout className="site-layout" style={{
                    borderRadius: '30px 0 0 30px',
                    backgroundColor: AppConfig.defaultLayoutContentBackgroundColor
                }}>
                    <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}