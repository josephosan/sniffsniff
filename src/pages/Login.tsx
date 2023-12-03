import React, {useState} from "react";
import {Divider, Button} from "antd";
import {useApp} from "../store/app.store";
import {appConfig} from "../config/app.config";
import FormBuilder from "../components/primary/FormBuilder";
import {FormBuilderField} from "../@types/app";
import {useNavigate} from "react-router-dom";
import AuthService from "../services/AuthService";
import {useAuth} from "../store/auth.store";
import UnderlinedLink from "../components/secondary/UnderlinedLink";


const Login: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {theme} = useApp();
    const navigate = useNavigate();
    const authStore = useAuth();
    const loginFormFields: FormBuilderField[] = [
        {
            placeholder: 'ایمیل',
            name: 'email',
            rules: [{required: true, message: 'پرکردن ایمیل اجباری است!'}],
            type: 'text'
        },
        {
            placeholder: 'رمز عبور',
            name: 'password',
            type: 'password',
            rules: [{required: true, message: 'پرکردن رمز عبور اجباری است!'}]
        }
    ]

    const handleLoginSubmit = async (formData: { username: string, password: string }) => {
        setLoading(() => true);
        try {
            const loginRes = await AuthService.login(formData);
            authStore.handleSetTokens(loginRes.data.data);

            const userRes = await AuthService.who();
            authStore.handleSetUser(userRes.data.data);

            navigate('/home');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(() => false);
        }
    }


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
                <FormBuilder
                    fields={loginFormFields}
                    submitButtonFlex={"center"}
                    submitButtonClasses={"px-5"}
                    colXL={24}
                    colSM={24}
                    size={'large'}
                    additionalElement={
                        <a
                            className={"ms-2 text-decoration-none"}
                            style={{color: theme.defaultTextColor, fontSize: appConfig.smallFontSize}}
                            onClick={() => navigate('/forgot-password')}
                        >رمز عبور خود را فراموش کرده ام</a>
                    }
                    onFinish={handleLoginSubmit}
                    submitButtonLoading={loading}
                    fieldsPaddingLevel={"0"}
                />
            </div>

            <div className={"w-100 px-5 mb-4"}>
                <Divider className={"my-0"}>یا</Divider>
            </div>
            <Button
                size="large"
                style={{backgroundColor: theme.cardBg}}
                htmlType="submit"
                className={"mb-3"}
            >
                <i className="bi bi-google"></i>
                <span className="mx-2">
                    ورود با گوگل
                </span>
            </Button>

            <UnderlinedLink
                text={'ایجاد حساب کاربری'}
                onElementClick={() => navigate('/sign-up')}
            />
        </div>
    );
}

export default Login;