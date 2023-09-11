import React from "react";
import {Link, useLocation} from "react-router-dom";
import {SidebarLinkItem} from "../../@types/app";
import AppConfig from "../../config/app.config";
import "../../styles/sidebar/phoneBottombar.scss";
import {getPageNameByPath} from "../../helpers/app.helper";


export const PhoneBottombar: React.FC = () => {
    const route = useLocation();
    const pageName = getPageNameByPath(route.pathname);
    let menuItems: SidebarLinkItem[] = [
        {
            path: '/help',
            label: 'مساعده',
            icon_classname_selected: 'bi bi-credit-card-2-front',
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
    ]

    menuItems = menuItems.map(el => {
       if (pageName === el.path.split("/")[1]) el.selected = true;
       return el;
    });

    return (
        <div
            style={{
                height: '100%',
                backgroundColor: 'transparent',
                margin: '0px'
            }}
            className="row w-100 d-flex justify-content-center"
        >
            <div className={"active-nav-top-border arrows-nav " + getPageNameByPath(route.pathname) + "-selected"}>
                <div
                    className="inner-active-nav-top-border"
                    style={{
                        backgroundColor: AppConfig.primaryColor
                    }}
                ></div>
            </div>
            {menuItems.map(item => (
                <div className="col" key={item.path}>
                    <Link
                        to={item.path}
                        className={"d-flex flex-column align-items-center"}
                        style={{textDecoration: "none", color: "inherit"}}
                    >
                        <i
                            className={item.selected ? item.icon_classname_selected : item.icon_classname}
                            style={{fontSize: '27px', color: AppConfig.primaryColor}}
                        ></i>
                        <span
                            style={{color: item.selected ? AppConfig.selectedTextColor : AppConfig.normalTextColor}}>{item.label}</span>
                    </Link>
                </div>
            ))}
        </div>
    );
}