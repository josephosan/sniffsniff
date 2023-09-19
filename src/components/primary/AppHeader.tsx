import React from "react";
import {TopBarIconWrapper} from "../secondary/TopBarIconWrapper";
import {Space} from "antd";

export const AppHeader: React.FC = () => {
    return (
        <Space className={"mt-3 w-100 d-flex justify-content-end align-items-center"}>
            <TopBarIconWrapper iconClasses={"bi bi-sun"}/>
            <TopBarIconWrapper size={20} iconClasses={"bi bi-bell"}/>
            <TopBarIconWrapper iconClasses={"bi bi-person"}/>
        </Space>
    );
}

