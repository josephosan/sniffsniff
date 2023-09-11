import React from "react";
import {Outlet} from "react-router-dom";
import {Layout} from "antd";

const {Sider, Content} = Layout;

export const DefaultLayout: React.FC = () => {

    return (
        <Layout hasSider className={"layout-container"}>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100%',
                    position: 'relative',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    borderRadius: '0 30px 30px 0'
                }}
            >
                <h1 className={"text-primary"}> hello there</h1>
            </Sider>
            <Layout className="site-layout" style={{marginLeft: 200}}>
                <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
}