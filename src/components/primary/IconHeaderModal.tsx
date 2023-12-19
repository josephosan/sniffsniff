import React from "react";
import WrapperModal from '../secondary/WrapperModal';
import { TopBarIconWrapper } from '../secondary/TopBarIconWrapper';
import { darkConfig, lightConfig } from '../../config/app.config';

import { useAuth } from '../../store/auth.store';
import { useNavigate } from 'react-router-dom';

interface IconHeaderModalProps {
    theme: never;
    setThemeConfig: any;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const IconHeaderModal: React.FC<IconHeaderModalProps> = ({
    theme,
    setThemeConfig,
    openModal,
    setOpenModal,
}) => {
    const authStore = useAuth();
    const navigate = useNavigate();

    const handleLogoutSubmit = async () => {
        try {
            authStore.logout();

            navigate('/login');
        } catch (err) {
            console.log(err);
        } finally {
        }
    };

    return (
        <>
            <WrapperModal
                elements={
                    <div>
                        <div
                            className={'w-100'}
                            style={{
                                height: 50,
                            }}
                        ></div>
                        <div className={'d-flex justify-content-between'}>
                            <TopBarIconWrapper
                                size={20}
                                iconClasses={'bi bi-box-arrow-right'}
                                onClick={handleLogoutSubmit}
                            />
                            <TopBarIconWrapper
                                size={20}
                                iconClasses={'bi bi-gear'}
                            />
                            <TopBarIconWrapper
                                iconClasses={
                                    'bi bi-' +
                                    (theme.mode === 'dark' ? 'moon' : 'sun')
                                }
                                size={theme.mode === 'dark' ? 20 : null}
                                onClick={() =>
                                    setThemeConfig(
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
                            <TopBarIconWrapper
                                size={20}
                                iconClasses={'bi bi-person-check'}
                            />
                        </div>
                    </div>
                }
                open={openModal}
                setOpenModal={setOpenModal}
                top={'9%'}
                footer={null}
                closable={false}
            ></WrapperModal>
        </>
    );
};

export default IconHeaderModal;
