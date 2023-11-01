import React from "react";
import {Input} from "antd";
import {appConfig} from "../../config/app.config";
import {useApp} from "../../store/app.store";
import SidebarItem from "../secondary/SidebarItem";


interface SidebarItem {
    name: string,
    icon: string,
    path: string
}

export const Sidebar: React.FC = () => {
    const {theme} = useApp();
    const sideBarItems: SidebarItem[] = [
        {
            name: "داشبورد",
            path: "/dashboard",
            icon: "bi bi-speedometer2"
        },
        {
            name: "جداول زمانی",
            path: "/timeline",
            icon: "bi bi-calendar-range"
        },
        {
            name: "کلاس ها",
            path: "/classes",
            icon: "bi bi-person-video3"
        },
        {
            name: "اعلان ها",
            path: "/notifications",
            icon: "bi bi-app-indicator"
        },
    ]

    return (
        <div
            className={"d-flex flex-column"}
            style={{
                color: theme.defaultTextColor
            }}
        >
            <div className={"mt-3 mb-4"}>
                logo here
            </div>

            <div className={"mb-3"}>
                <Input
                    placeholder={'جستجو ...'}
                    prefix={<i style={{fontSize: appConfig.smallIconSize + "px"}} className={"bi bi-search"}></i>}
                    size={"middle"}
                />
            </div>

            <div className={"d-flex flex-column"}>
                {
                    sideBarItems.map(item => (
                        <SidebarItem
                            key={item.name}
                            name={item.name}
                            icon={item.icon}
                            path={item.path}
                        />
                    ))
                }
            </div>
        </div>
    );
}