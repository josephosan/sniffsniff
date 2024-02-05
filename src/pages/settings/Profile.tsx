import React from 'react';
import { useApp } from '../../store/app.store';
import { appConfig } from '../../config/app.config';
import WrapperUserImage from '../../components/tiny/WrapperUserImage';
import '../../styles/pages/view.task.scss';
import TextItemWrapper from '../../components/tiny/TextItemWrapper';
import { Upload, Button } from 'antd';

const ProfileSettings: React.FC = () => {
    const { theme } = useApp();

    const handleInputBlur = (value: string) => {
        console.log(value);
    };

    return (
        <div className="d-flex justify-content-center">
            <div
                style={{
                    backgroundColor: theme.primaryFaded2X,
                    borderRadius: appConfig.defaultBorderRadius,
                }}
                className="w-100 p-3 px-5 d-flex align-items-center row gap-4"
            >
                <div className="col-sm col-md-4 col-xl-3 d-flex justify-content-center">
                    <WrapperUserImage
                        preview={true}
                        url="/public/joseph.jpg"
                        rounded={true}
                        size="200px"
                    />
                </div>

                <div className="col-sm col-md-7 col-x-9 d-flex flex-column gap-4 ">
                    <div className="user">
                        <input
                            className="username-input"
                            style={{
                                backgroundColor: 'inherit',
                                border: 'none',
                                width: '100%',
                                fontSize: appConfig.hugeFontSize + 20,
                                color: 'inherit',
                            }}
                            defaultValue={'یوسف اصانلو'}
                            onBlur={(e) => handleInputBlur(e.target.value)}
                        />
                        <TextItemWrapper
                            text="test@gmail.com"
                            fontSize={appConfig.largeFontSize}
                        />
                    </div>

                    <Upload>
                        <Button icon={<i className="bi bi-upload"></i>}>
                            بارگذاری عکس
                        </Button>
                    </Upload>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
