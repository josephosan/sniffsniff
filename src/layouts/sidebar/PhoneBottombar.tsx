import React from "react";
import {Link, useLocation} from "react-router-dom";
import AppConfig from "../../config/app.config";
import "../../styles/sidebar/phoneBottombar.scss";
import {getPageNameByPath} from "../../helpers/app.helper";
import {SidebarLinkItem} from "../../@types/app";

interface phoneBottombarProp {
    menuItems: SidebarLinkItem[]
}

export const PhoneBottombar: React.FC<phoneBottombarProp> = ({ menuItems }) => {
    const route = useLocation();

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
            {menuItems.map(item => {
                if (!item.desktop)
                    return <div className="col" key={item.path}>
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
                </div>;
            })}
        </div>
    );
}