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
        <div className="d-flex justify-content-center flex-column align-items-center gap-3">
            <div
                style={{
                    backgroundColor: theme.primaryFaded2X,
                    borderRadius: appConfig.defaultBorderRadius,
                }}
                className="w-100 py-5 px-5 d-flex align-items-center row gap-4"
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

            <div className="flex-column d-flex px-0 align-items-center w-100">
                <div className="d-flex gap-3 row w-100">
                    <div
                        className="d-flex w-100 col-sm flex-column justify-content-center px-xl-5 align-items-center"
                        style={{
                            borderRadius: appConfig.defaultBorderRadius,
                            backgroundColor: theme.primaryFaded2X,
                            minWidth: '200px',
                        }}
                    >
                        <div className="d-flex row gap-3 h-100 align-items-center w-100 justify-content-between px-1 ">
                            <div className="d-flex col-sm flex-column align-items-center  ">
                                <TextItemWrapper
                                    text="120"
                                    fontSize={appConfig.hugeFontSize + 10}
                                />
                                <TextItemWrapper
                                    text="Following"
                                    fontSize={appConfig.hugeFontSize}
                                />
                            </div>
                            <div className="d-flex col-sm flex-column align-items-center">
                                <TextItemWrapper
                                    text="134"
                                    fontSize={appConfig.hugeFontSize + 10}
                                />
                                <TextItemWrapper
                                    text="Followers"
                                    fontSize={appConfig.hugeFontSize}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="d-flex w-100 col-sm flex-column  px-3 py-3 gap-2"
                        style={{
                            borderRadius: appConfig.defaultBorderRadius,
                            backgroundColor: theme.primaryFaded2X,
                            minWidth: '200px',
                        }}
                    >
                        <TextItemWrapper
                            text="بیوگرافی"
                            fontSize={appConfig.hugeFontSize}
                        />
                        <div>
                            <div className="user">
                                <textarea
                                    className="username-input description w-100"
                                    rows={6}
                                    style={{
                                        resize: 'none',
                                        backgroundColor: 'inherit',
                                        border: 'none',
                                        fontSize: appConfig.defaultFontSize,
                                        color: 'inherit',
                                    }}
                                    defaultValue={
                                        ' باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.'
                                    }
                                    onBlur={(e) =>
                                        handleInputBlur(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
