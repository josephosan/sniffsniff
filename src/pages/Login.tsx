import React from "react";
import {Divider, Form, Input, Button} from "antd";
import {useApp} from "../store/app.store";
import {appConfig} from "../config/app.config";
import {Link} from "react-router-dom";


const Login: React.FC = () => {
    const {theme} = useApp();


    return (
        <div className={"mx-3 d-flex flex-column justify-content-between align-items-center h-100"}
             style={{color: theme.fadeTextColor, fontSize: appConfig.smallFontSize}}>
            <div>
                logo here
            </div>
            <div>
                <h3 style={{fontSize: appConfig.largeFontSize}}>به اجوایونت خوش آمدید!</h3>
            </div>
            <div className={"w-100"}>
                <Form>
                    <Form.Item name="email" className={"mb-0"}>
                        <Input size="large" placeholder="ایمیل"/>
                    </Form.Item>
                    <a style={{ fontSize: appConfig.smallFontSize, color: theme.fadeTextColor }}>رمز عبور خود را فراموش کرده اید؟</a>
                    <Form.Item className="d-flex justify-content-center" name="button">
                        <Button className="px-5 mt-5" size="large" type="primary" htmlType="submit"
                                style={{fontSize: appConfig.defaultFontSize}}>
                            ورود
                        </Button>
                    </Form.Item>
                </Form>

            </div>

            <div className={"w-100 px-5"}>
                <Divider>یا</Divider>
            </div>
            <Button style={{fontSize: appConfig.defaultFontSize}} className="w-25" size="large" type="primary"
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