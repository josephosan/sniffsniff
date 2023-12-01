import React, {useEffect, useState} from 'react';
import {TopBarIconWrapper} from '../secondary/TopBarIconWrapper';
import {Breadcrumb, Space} from 'antd';
import {useApp} from '../../store/app.store';
import {appConfig, darkConfig, lightConfig} from '../../config/app.config';
import IconHeaderModal from './IconHeaderModal';
import {handleGetBreadcrump} from '../../helpers/app.helper';
import {useLocation, useNavigate} from 'react-router-dom';

import WrapperDropDown from '../secondary/WrapperDropDown';

interface AppHeaderProps {
    isMobile: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({isMobile}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const {theme, setThemeMode, handleSetSidebarCollapsed} = useApp();
    const [openModal, setOpenModal] = useState(false);
    const [breadcrumbItems, setBreadcrumbItems] = useState<
        { href: string; title: string }[] | null
    >(null);

    useEffect(() => {
        setBreadcrumbItems((prevState) => {
            return handleGetBreadcrump(location.pathname);
        });
    }, [location.pathname]);

    return (
        <div
            className={
                'mt-3 w-100 d-flex align-items-center justify-content-' +
                (isMobile ? 'between' : 'between')
            }
        >
            {isMobile ? (
                <Space onClick={() => handleSetSidebarCollapsed(true)}>
                    <TopBarIconWrapper iconClasses={'bi bi-list'}/>
                </Space>
            ) : (
                <Breadcrumb
                    style={{
                        fontSize: appConfig.largeFontSize + 'px',
                        cursor: 'pointer',
                    }}
                >
                    {breadcrumbItems &&
                        breadcrumbItems.map((el) => {
                            return (
                                <Breadcrumb.Item
                                    onClick={() => navigate(el.href)}
                                    key={el.title}
                                >
                                    {el.title}
                                </Breadcrumb.Item>
                            );
                        })}
                </Breadcrumb>
            )}
            <Space
                onClick={() => {
                    setOpenModal(true);
                }}
            >
                {!isMobile ? (
                    <Space>
                        <TopBarIconWrapper
                            iconClasses={
                                'bi bi-' +
                                (theme.mode === 'dark' ? 'moon' : 'sun')
                            }
                            size={theme.mode === 'dark' ? 20 : null}
                            onClick={() =>
                                setThemeMode(
                                    theme === lightConfig
                                        ? darkConfig
                                        : lightConfig,
                                )
                            }
                        />
                        <TopBarIconWrapper
                            size={20}
                            iconClasses={'bi bi-bell'}
                        />
                        <WrapperDropDown
                            items={[
                                {
                                    key: '1',
                                    label: (
                                        <div>
                                            <i className={"bi bi-person-check ms-1"}></i>
                                            <span>پروفایل</span>
                                        </div>
                                    ),
                                },
                                {
                                    key: '2',
                                    label: (
                                        <div>
                                            <i className={"bi bi-gear ms-1"}></i>
                                            <span>تنظیمات</span>
                                        </div>
                                    ),
                                },
                                {
                                    key: '3',
                                    label: (
                                        <div>
                                            <i className={"bi bi-box-arrow-right ms-1"}></i>
                                            <span>خروج</span>
                                        </div>
                                    ),
                                    danger: true
                                }
                            ]}
                        >
                            <TopBarIconWrapper iconClasses={'bi bi-person'}/>
                        </WrapperDropDown>
                    </Space>
                ) : (
                    <>
                        <TopBarIconWrapper
                            iconClasses={'bi bi-three-dots-vertical'}
                        />

                        <IconHeaderModal
                            theme={theme}
                            setThemeConfig={setThemeMode}
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                        />
                    </>
                )}
            </Space>
        </div>
    );
};
