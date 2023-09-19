import React from "react";

interface SidebarItem {
    name: string,
    icon: string,
    path: string
}

export const Sidebar: React.FC = () => {
    const sideBarItems: SidebarItem[] = [
        {
            name: "داشبورد",
            path: "/dashboard",
            icon: "bi bi-dashboard"
        },
        {
            name: "جداول زمانی",
            path: "/timelines",
            icon: "bi bi-calender"
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

            }}
        >
           <div>
               logo here
           </div>

            <div>
                search box here
            </div>

            <div>
                items here
            </div>
        </div>
    );
}