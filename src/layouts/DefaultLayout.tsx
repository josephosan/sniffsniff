import React, {useEffect, useState} from "react";

import AppConfig from "../config/app.config";
import {Outlet, useLocation} from "react-router-dom";
import {Layout} from "antd";
import {useApp} from "../store/app.store";
import {PhoneBottombar} from "./sidebar/PhoneBottombar";
import {SidebarLinkItem} from "../@types/app";
import {getPageNameByPath} from "../helpers/app.helper";
import {DesktopSidebar} from "./sidebar/DesktopSidebar";

const {Sider, Content, Footer} = Layout;

export const DefaultLayout: React.FC = () => {
    const route = useLocation();
    const pageName = getPageNameByPath(route.pathname);
    const {isMobile} = useApp();
    const [sidebarItems, setSidebarItems] = useState<SidebarLinkItem[]>([
        {
            path: '/help',
            label: 'مساعده',
            icon_classname_selected: 'bi bi-credit-card-2-front-fill',
            icon_classname: 'bi bi-credit-card-2-front',
            selected: false
        },
        {
            path: '/users',
            label: 'کاربران',
            icon_classname_selected: 'bi bi-people-fill',
            icon_classname: 'bi bi-people',
            selected: false
        },
        {
            path: '/home',
            label: 'خانه',
            icon_classname_selected: 'bi bi-house-door-fill',
            icon_classname: 'bi bi-house-door',
            selected: false
        },

        {
            path: '/requests',
            label: 'درخواست ها',
            icon_classname_selected: 'bi bi-envelope-paper-fill',
            icon_classname: 'bi bi-envelope-paper',
            selected: false
        },
        {
            path: '/messages',
            label: 'پیام ها',
            icon_classname_selected: 'bi bi-chat-dots-fill',
            icon_classname: 'bi bi-chat-dots',
            selected: false
        },
        {
            path: '/settings',
            label: 'تنظیمات',
            icon_classname_selected: 'bi bi-gear-fill',
            icon_classname: 'bi bi-gear',
            selected: false,
            desktop: true
        },
    ]);

    useEffect(() => {
        // for changing the selected bar item.
        setSidebarItems(prevSidebarState => {
            return prevSidebarState.map(el => ({
                ...el,
                selected: pageName === el.path.split("/")[1]
            }));
        });
    }, [pageName]);

    if (isMobile) {
        return (
            <Layout className={"layout-container-phone"}>
                <div
                    style={{
                        backgroundColor: AppConfig.defaultLayoutContentBackgroundColor,
                        width: '100%',
                        height: '100%',
                        padding: '10px'
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
                    <PhoneBottombar menuItems={sidebarItems}/>
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
                    <DesktopSidebar menuItems={sidebarItems}/>
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