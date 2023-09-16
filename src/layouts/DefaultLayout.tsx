import React from "react";

import {Outlet} from "react-router-dom";
import {Layout} from "antd";

const { Header, Content, Footer, Sider } = Layout;
export const DefaultLayout: React.FC = () => {
    return (
        <Layout
            style={{
                height: "100%"
            }}
        >
            <Sider>Sider</Sider>
            <Layout>
                <Header className={"bg-light"}>Header</Header>
                <Content className={"p-3"}><Outlet /></Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    );
}