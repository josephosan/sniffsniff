import React from 'react';
import { useApp } from '../store/app.store';
import { appConfig } from '../config/app.config';
import WrapperUserImage from '../components/tiny/WrapperUserImage';

const Profile: React.FC = () => {
    const { theme } = useApp();

    return (
        <div className="d-flex h-100 px-2 justify-content-center row gap-3">
            <div
                className="col-sm col-md-4 col-xl-3 flex-column d-flex align-items-center py-5"
                style={{
                    borderRadius: appConfig.defaultBorderRadius,
                    backgroundColor: theme.primaryFaded2X,
                    minHeight: '700px',
                }}
            >
                <WrapperUserImage
                    bgColor={theme.primaryFaded}
                    size="150px"
                    url="/public/person.svg"
                />
            </div>
            <div className="col-sm col-md col-xl flex-column d-flex gap-3 px-0">
                <div
                    style={{
                        borderRadius: appConfig.defaultBorderRadius,
                        backgroundColor: theme.primaryFaded2X,
                        height: '400px',
                    }}
                ></div>
                <div
                    className="d-flex w-100 gap-3"
                    style={{
                        height: '400px',
                    }}
                >
                    <div
                        className="w-50"
                        style={{
                            borderRadius: appConfig.defaultBorderRadius,
                            backgroundColor: theme.primaryFaded2X,
                        }}
                    ></div>
                    <div
                        className="w-50"
                        style={{
                            borderRadius: appConfig.defaultBorderRadius,
                            backgroundColor: theme.primaryFaded2X,
                        }}
                    ></div>
                </div>

                <div
                    className="w-100 h-100"
                    style={{
                        borderRadius: appConfig.defaultBorderRadius,
                        backgroundColor: theme.primaryFaded2X,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Profile;
