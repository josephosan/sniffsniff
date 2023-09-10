import React from "react";
import {Outlet} from "react-router-dom";
import {useApp} from "../store/app.store";

export const DefaultLayout: React.FC = () => {
    const { isMobile } = useApp();

    return (
        <div className={isMobile ? "" : "layout-container"}>
            The default layout is here.
            <Outlet />
        </div>
    );
}