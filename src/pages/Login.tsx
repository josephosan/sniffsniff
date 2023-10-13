import React from "react";
import {Divider, Form, Input, Button} from "antd";
import {useApp} from "../store/app.store";
import {appConfig} from "../config/app.config";


const Login: React.FC = () => {
    const {theme} = useApp();


    return (
        <div className={"mx-3 d-flex flex-column justify-content-between align-items-center h-100"}
             style={{color: theme.fadeTextColor, fontSize: appConfig.smallFontSize}}>
            <div>
                logo here
            </div>
            <div className={"mt-5"}>
                <h3 style={{fontSize: appConfig.hugeFontSize}}>به اجوایونت خوش آمدید!</h3>
            </div>
            <div className={"w-100 mt-3"}>
                <Form>
                    <Form.Item name="email" className={"mb-0"}>
                        <Input size="large" placeholder="ایمیل"/>
                    </Form.Item>
                    <a className={"me-1"} style={{ fontSize: appConfig.smallFontSize, color: theme.fadeTextColor }}>رمز عبور خود را فراموش کرده اید؟</a>
                    <Form.Item className="d-flex justify-content-center mb-0 mt-4" name="button">
                        <Button className="px-5 mt-5" size="large" type="primary" htmlType="submit"
                                style={{fontSize: appConfig.defaultFontSize}}>
                            ورود
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className={"w-100 px-5"}>
                <Divider className={"my-0"}>یا</Divider>
            </div>
            <Button size="large" style={{ backgroundColor: theme.cardBg }}
                    htmlType="submit">
                <i className="bi bi-google"></i>
                <span className="mx-2">
                    ورود با گوگل
                </span>
            </Button>

            <div>
                حساب کاربری ندارید؟ <span
                style={{
                    textDecoration: "underline",
                    paddingBottom: '3px',
                    textDecorationSkipInk: 'none',
                    textDecorationColor: theme.primaryColor,
                    cursor: 'pointer'
                }}
            >ایجاد</span>
            </div>
        </div>
    );
}

export default Login;