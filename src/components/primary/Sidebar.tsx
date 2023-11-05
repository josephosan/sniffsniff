import React from "react";
import {Input,ColorPicker} from "antd";
import {appConfig} from "../../config/app.config";
import {useApp} from "../../store/app.store";
import SidebarItem from "../secondary/SidebarItem";
import ActionIconWrapper from "../secondary/ActionIconWrapper";
import CustomSelect from "./CustomSelect";




interface SidebarItem {
    name: string,
    icon: string,
    path: string
}

export const Sidebar: React.FC = () => {
    const {theme, filterMode, handleSetFilterMode} = useApp();
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
   
    const selectChooseOptions = [
        { label: 'اولین تاریخ', value: 'option1' },
        { label: 'آخرین تاریخ', value: 'option1' },
        { label: 'اولین حرف', value: 'option1' },
        { label: 'آخرین حرف', value: 'option1' }

    ]
    const selectTypeOptions = [
        { label: 'خصوصی', value: 'option1' },
        { label: 'عمومی', value: 'option1' },
       
    ]


    return (
        <div
            className={"d-flex flex-column"}
            style={{
                color: theme.defaultTextColor
            }}
        >
            {
                filterMode ? (
                    <>
                        <div className={"d-flex justify-content-between align-items-center mx-2 mt-5 vh-100"}>
                            <div
                               className="d-flex flex-column w-100 vh-100"
                               
                            >
                                <div className="d-flex flex-row justify-content-between">
                                    <div className="d-flex flex-row">
                                <ActionIconWrapper
                                    icon={"bi bi-filter ms-1"}
                                    clickable={false}
                                    size={appConfig.defaultIconSize}
                                />
                                <h5
                                    style={{
                                        fontWeight: "bold"
                                    }}
                                        >فیلتر ها</h5>
                                        </div>
                                    <ActionIconWrapper
                                icon={"bi bi-arrow-left"}
                                clickable={true}
                                size={appConfig.defaultIconSize}
                                iconClicked={() => handleSetFilterMode(false)}
                            />
                                    </div>
                                <div className="d-flex flex-column h-25 justify-content-between">
                                    <ColorPicker showText={() => <span>رنگ </span>}
                                    size={'large'}
                                    style={{borderColor: theme.primaryColor}}/>
                                <CustomSelect 
        options={selectChooseOptions}
        placeholder="بر اساس"
                                />
                                <CustomSelect 
        options={selectChooseOptions}
        placeholder="by tag"
                                />
                                <CustomSelect 
        options={selectTypeOptions}
        placeholder="تایپ"
                                />
                       
                                
                              </div>  

                            </div>

                            
                        </div>
                        <div>

                        </div>
                    </>
                ) : (
                    <>
                        <div className={"mt-3 mb-4"}>
                            logo here
                        </div>

                        <div className={"mb-3"}>
                            <Input
                                placeholder={'جستجو ...'}
                                prefix={<i style={{fontSize: appConfig.smallIconSize + "px"}}
                                           className={"bi bi-search"}></i>}
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
                    </>
                )
            }
        </div>
    );
}