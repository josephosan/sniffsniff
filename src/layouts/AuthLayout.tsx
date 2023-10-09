import React from "react";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import {useApp} from "../store/app.store";
import WrapperCard from "../components/secondary/WrapperCard";
import {useMediaQuery} from "react-responsive";
import {appConfig} from "../config/app.config";

const AuthLayout: React.FC = () => {
    const isMobile = useMediaQuery({query: `(max-width: ${appConfig.appBreakPoint}px)`});
    const {theme} = useApp();

    return (
        <Layout
            className={"d-flex justify-content-center align-items-center"}
            style={{
                width: "100%",
                height: "100vh",
                backgroundColor: theme.mainBackgroundColor
            }}
        >
            {
                isMobile ? (
                    <div style={{height: '600px'}}>
                        <Outlet/>
                    </div>
                ) : (
                    <WrapperCard
                        width={500}
                        height={600}
                    >
                        <Outlet/>
                    </WrapperCard>
                )
            }
        </Layout>
    );
}

export default AuthLayout;