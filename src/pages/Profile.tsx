import React, { useState } from 'react';
import { useApp } from '../store/app.store';
import { appConfig } from '../config/app.config';
import WrapperUserImage from '../components/tiny/WrapperUserImage';
import TextItemWrapper from '../components/tiny/TextItemWrapper';
import { TopBarIconWrapper } from '../components/secondary/TopBarIconWrapper';

import { Button } from 'antd';

const Profile: React.FC = () => {
    const { theme } = useApp();
    const [loading, setLoading] = useState(false); //should be true

    const status = 'تهران'; //for test

    return (
        <>
            {loading && <p>loading</p>}

            {!loading && (
                <div className="d-flex h-100 px-2 justify-content-center row gap-3  ">
                    <div
                        className="col-sm col-md-4 col-xl-3 flex-column d-flex pb-3 pt-5 justify-content-between align-items-center "
                        style={{
                            borderRadius: appConfig.defaultBorderRadius,
                            backgroundColor: theme.primaryFaded2X, // why?
                            minHeight: '900px',
                        }}
                    >
                        <div className="d-flex flex-column gap-3 ">
                            <WrapperUserImage
                                bgColor={theme.primaryFaded}
                                size="170px"
                                url="/public/person.svg"
                            />
                            <div className="w-100 d-flex flex-column gap-3 align-items-center  ">
                                <TextItemWrapper
                                    text="test"
                                    fontSize={appConfig.hugeFontSize + 10}
                                    style={{
                                        fontWeight: '900',
                                    }}
                                />
                                <TextItemWrapper
                                    text="test@gmail.com"
                                    fontSize={appConfig.smallFontSize}
                                />
                                <div className="d-flex gap-3">
                                    <TopBarIconWrapper
                                        iconClasses="bi bi-person-add"
                                        shadow={false}
                                        backgroundColor={theme.primaryFaded}
                                    />
                                    <TopBarIconWrapper
                                        iconClasses="bi bi-plus-circle-dotted"
                                        shadow={false}
                                        backgroundColor={theme.primaryFaded}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-column align-items-center justify-content-center ">
                            <i
                                className="bi bi-quote"
                                style={{ fontSize: '60px' }}
                            ></i>
                            <div className="px-4">
                                <TextItemWrapper
                                    text="
                                                        زمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این"
                                />
                            </div>
                        </div>

                        <div
                            style={{
                                borderRadius: appConfig.defaultBorderRadius,
                                backgroundColor: theme.primaryFaded,
                                padding: appConfig.defaultPadding,
                            }}
                            className="w-100 d-flex flex-column gap-5 "
                        >
                            <div className="d-flex flex-column gap-3 ">
                                <TextItemWrapper
                                    text={`وضعیت: ${status}`}
                                    fontSize={appConfig.largeFontSize}
                                    style={{
                                        fontWeight: '700',
                                    }}
                                />
                                <TextItemWrapper
                                    text={`سن: ${status}`}
                                    fontSize={appConfig.defaultFontSize}
                                />
                                <TextItemWrapper
                                    text={`مکان: ${status}`}
                                    fontSize={appConfig.defaultFontSize}
                                />
                            </div>
                            <div className="w-100 gap-3">
                                <Button type="primary">student</Button>
                                <Button type="primary">student</Button>
                                <Button type="primary">student</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm col-md col-xl flex-column d-flex gap-3 px-0 ">
                        <div
                            style={{
                                borderRadius: appConfig.defaultBorderRadius,
                                backgroundColor: theme.primaryFaded2X,
                                flex: 1,
                            }}
                            className="d-flex flex-column gap-3 px-5 py-3"
                        >
                            <TextItemWrapper
                                text="بیوگرافی"
                                fontSize={appConfig.hugeFontSize}
                            />
                            <div className="px-3">
                                <TextItemWrapper
                                    text="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتاراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ"
                                    fontSize={appConfig.defaultFontSize}
                                />
                            </div>
                        </div>
                        <div className="d-flex w-100 gap-3" style={{ flex: 1 }}>
                            <div
                                className="w-50 d-flex flex-column justify-content-center px-xl-5 align-items-center"
                                style={{
                                    borderRadius: appConfig.defaultBorderRadius,
                                    backgroundColor: theme.primaryFaded2X,
                                }}
                            >
                                <div className="d-flex row gap-3 h-100 align-items-center w-100 justify-content-between px-1 ">
                                    <div className="d-flex col-sm flex-column align-items-center  ">
                                        <TextItemWrapper
                                            text="120"
                                            fontSize={appConfig.hugeFontSize}
                                        />
                                        <TextItemWrapper
                                            text="Following"
                                            fontSize={appConfig.hugeFontSize}
                                        />
                                    </div>
                                    <div className="d-flex col-sm flex-column align-items-center">
                                        <TextItemWrapper
                                            text="134"
                                            fontSize={appConfig.hugeFontSize}
                                        />
                                        <TextItemWrapper
                                            text="Followers"
                                            fontSize={appConfig.hugeFontSize}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                className="d-flex flex-column  px-2 py-3 gap-2 w-50"
                                style={{
                                    borderRadius: appConfig.defaultBorderRadius,
                                    backgroundColor: theme.primaryFaded2X,
                                }}
                            >
                                <TextItemWrapper
                                    text="بیوگرافی"
                                    fontSize={appConfig.hugeFontSize}
                                />
                                <div className="px-2">
                                    <TextItemWrapper
                                        text="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است  کارحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ"
                                        fontSize={appConfig.defaultFontSize}
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                borderRadius: appConfig.defaultBorderRadius,
                                backgroundColor: theme.primaryFaded2X,
                                flex: 'auto',
                            }}
                            className="d-flex flex-column gap-3 px-5 py-3 "
                        >
                            <TextItemWrapper
                                text="بیوگرافی"
                                fontSize={appConfig.hugeFontSize}
                            />
                            <div className="px-3 ">
                                <TextItemWrapper
                                    text="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتاراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ"
                                    fontSize={appConfig.defaultFontSize}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
