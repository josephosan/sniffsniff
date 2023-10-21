import React, { useState } from "react";
import {Divider, Form, Input, Button} from "antd";
import {useApp} from "../store/app.store";
import {appConfig} from "../config/app.config";
import FormBuilder from "../components/primary/FormBuilder";
import {FormBuilderField} from "../@types/app";
import {useNavigate} from "react-router-dom";


const Login: React.FC = () => {
    const { theme } = useApp();
    const navigate = useNavigate();
    const [mode, modechange] = useState(true)
    const loginFormFields: FormBuilderField[] = [
        {
            placeholder: 'ایمیل',
            name: 'email',
            rules: [{ required: true, message: 'فیلد ایمیل اجباری است!' }],
            type: 'text'
        },
        {
            placeholder: 'رمز عبور',
            name: 'password',
            type: 'password',
            rules: [{ required: true, message: 'فیلد رمز عبور اجباری است!' }]
        }
    ]
     const changePasswordFormFields: FormBuilderField[] = [
        {
            placeholder: 'رمز عبور',
            name: 'password',
            rules: [{ required: true, message: 'فیلد ایمیل اجباری است!' }],
            type: 'password'
        },
        {
            placeholder: 'تکرار رمز عبور',
            name: 'confirmpassword',
            type: 'password',
            rules: [{ required: true, message: 'فیلد رمز عبور اجباری است!' }]
        }
    ]


    return (
        
        <div className={"mx-3 d-flex flex-column justify-content-between align-items-center h-100"}
            style={{ color: theme.fadeTextColor, fontSize: appConfig.smallFontSize }}>
            {
              mode ? (<><div>
                logo here
            </div>
            
            <div className={"mt-5"}>
                <h3 style={{ fontSize: appConfig.hugeFontSize }}>تغییر رمز ورود   </h3>
            </div>
            
            <div className={"w-100 mt-3"}>
                <FormBuilder
                    fields={changePasswordFormFields}
                    submitButtonFlex={"center"}
                            submitButtonClasses={"px-5"}
                            additionalElement={<div></div>}
                    colXLSpan={24}
                    colSMSpan={24}
                />
                    </div>
                <span
                    style={{
                        textDecoration: "underline",
                        paddingBottom: '3px',
                        textDecorationSkipInk: 'none',
                        textDecorationColor: theme.primaryColor,
                        cursor: 'pointer'
                    }}
                >بازگشت به صفحه ایمیل</span></>) : (<>
            <div>
                logo here
            </div>
            
            <div className={"mt-5"}>
                <h3 style={{ fontSize: appConfig.hugeFontSize }}>به اجوایونت خوش آمدید!</h3>
            </div>
            
            <div className={"w-100 mt-3"}>
                <FormBuilder
                    fields={loginFormFields}
                    submitButtonFlex={"center"}
                    submitButtonClasses={"px-5"}
                    additionalElement={
                        <a
                            className={"ms-2 text-decoration-none"}
                            style={{ color: theme.defaultTextColor }}
                            onClick={() => navigate('/reset-password')}
                        >رمز عبور خود را فراموش کرده ام</a>
                    }
                    colXLSpan={24}
                    colSMSpan={24}
                />
            </div>
            

            <div className={"w-100 px-5 mb-4"}>
                <Divider className={"my-0"}>یا</Divider>
            </div>
            <Button
                size="large"
                style={{ backgroundColor: theme.cardBg }}
                htmlType="submit"
                className={"mb-3"}
            >
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
              </>  )
            }
            
        </div>
    
    );

                }
                

export default Login;