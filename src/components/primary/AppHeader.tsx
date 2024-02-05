import React, { useEffect, useState } from 'react';
import { TopBarIconWrapper } from '../secondary/TopBarIconWrapper';
import { Breadcrumb, Space } from 'antd';
import { useApp } from '../../store/app.store';
import { appConfig, darkConfig, lightConfig } from '../../config/app.config';
import IconHeaderModal from './IconHeaderModal';
import { handleGetBreadcrump } from '../../helpers/app.helper';
import { useLocation, useNavigate } from 'react-router-dom';

import WrapperDropDown from '../secondary/WrapperDropDown';
import { useAuth } from '../../store/auth.store';
import NotificationBell from '../secondary/NotificationBell';

interface AppHeaderProps {
    isMobile: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = React.memo(
    ({ isMobile }) => {
        const location = useLocation();
        const navigate = useNavigate();
        const { theme, setThemeMode, handleSetSidebarCollapsed } = useApp();
        const [openModal, setOpenModal] = useState(false);
        const [scrolled, setScrolled] = useState(true); // todo: make this dynamic
        const [breadcrumbItems, setBreadcrumbItems] = useState<
            | {
                  href: string;
                  title: string;
                  icon: string;
                  clickable: boolean;
              }[]
            | null
        >(null);

        const authStore = useAuth();

        useEffect(() => {
            setBreadcrumbItems(() => {
                return handleGetBreadcrump(location.pathname);
            });
        }, [location.pathname]);

        const handleLogoutSubmit = async () => {
            try {
                authStore.logout();

                navigate('/login');
            } catch (err) {
                console.log(err);
            }
        };

        return (
            <div
                className={
                    'px-3 mt-3 d-flex align-items-center justify-content-' +
                    (isMobile ? 'between ' : 'between ') +
                    (scrolled ? 'custom-shadow' : '')
                }
                style={{
                    position: 'fixed',
                    top: 0,
                    left: appConfig.defaultPadding,
                    right: isMobile
                        ? appConfig.defaultPadding
                        : appConfig.sidebarWidth - 17,
                    backgroundColor: scrolled ? theme.cardBg : undefined,
                    borderRadius: appConfig.defaultBorderRadius,
                    zIndex: 1,
                }}
            >
                {isMobile ? (
                    <Space
                        className={'p-2'}
                        onClick={() => handleSetSidebarCollapsed(true)}
                    >
                        <TopBarIconWrapper iconClasses={'bi bi-list'} />
                    </Space>
                ) : (
                    <Breadcrumb
                        style={{
                            fontSize: appConfig.largeFontSize + 'px',
                        }}
                    >
                        {breadcrumbItems &&
                            breadcrumbItems.map((el) => {
                                return (
                                    <Breadcrumb.Item
                                        onClick={() =>
                                            el.clickable
                                                ? navigate(el.href)
                                                : undefined
                                        }
                                        key={el.href}
                                    >
                                        <Space
                                            style={{
                                                cursor: el.clickable
                                                    ? 'pointer'
                                                    : 'not-allowed',
                                            }}
                                        >
                                            <i className={el.icon}></i>
                                            <span>{el.title}</span>
                                        </Space>
                                    </Breadcrumb.Item>
                                );
                            })}
                    </Breadcrumb>
                )}
                <Space>
                    {!isMobile ? (
                        <Space className={'d-flex align-items-center py-2'}>
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
                            <NotificationBell />

                            <WrapperDropDown
                                items={[
                                    {
                                        key: '1',
                                        label: (
                                            <div
                                                onClick={() =>
                                                    navigate(
                                                        `/profile/${authStore.user?.id}`,
                                                    )
                                                }
                                            >
                                                <i
                                                    className={
                                                        'bi bi-person-check ms-1'
                                                    }
                                                ></i>
                                                <span>پروفایل</span>
                                            </div>
                                        ),
                                    },
                                    {
                                        key: '2',
                                        label: (
                                            <div
                                                onClick={() =>
                                                    navigate(
                                                        `/settings/profile`,
                                                    )
                                                }
                                            >
                                                <i
                                                    className={
                                                        'bi bi-gear ms-1'
                                                    }
                                                ></i>
                                                <span>تنظیمات</span>
                                            </div>
                                        ),
                                    },
                                    {
                                        key: '3',
                                        label: (
                                            <div onClick={handleLogoutSubmit}>
                                                <i
                                                    className={
                                                        'bi bi-box-arrow-right ms-1'
                                                    }
                                                ></i>
                                                <span>خروج</span>
                                            </div>
                                        ),
                                        danger: true,
                                    },
                                ]}
                            >
                                <TopBarIconWrapper
                                    iconClasses={'bi bi-person'}
                                />
                            </WrapperDropDown>
                        </Space>
                    ) : (
                        <div>
                            <TopBarIconWrapper
                                iconClasses={'bi bi-three-dots-vertical'}
                                onClick={() => setOpenModal(true)}
                            />

                            <IconHeaderModal
                                theme={theme}
                                setThemeConfig={setThemeMode}
                                openModal={openModal}
                                setOpenModal={setOpenModal}
                            />
                        </div>
                    )}
                </Space>
            </div>
        );
    },
);
