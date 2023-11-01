import React, {useState} from "react";
import {useApp} from "../store/app.store";
import FormBuilder from "../components/primary/FormBuilder";
import {FormBuilderField} from "../@types/app";
import {appConfig} from "../config/app.config";
import {useNavigate} from "react-router-dom";
import UnderlinedLink from "../components/secondary/UnderlinedLink";



const ForgotPassword: React.FC = () => {
    const [mode, setMode] = useState<string>('email');
    const {theme} = useApp();
    const navigate = useNavigate();
    const forgotPasswordFormFields: FormBuilderField[] = [
        {
            placeholder: 'ایمیل',
            name: 'email',
            rules: [{required: true, message: 'فیلد ایمیل اجباری است!'}],
            type: 'text'
        }
    ]
    const confirmPasswordFormFields: FormBuilderField[] = [
        {
            placeholder: 'رمز عبور',
            name: 'password',
            rules: [{required: true, message: 'فیلد رمز عبور اجباری است!'}],
            type: 'password'

        }
        , {
            placeholder: 'تایید رمز عبور',
            name: 'confirmPassword',
            rules: [{required: true, message: 'فیلد تایید رمز عبور اجباری است!'}],
            type: 'password'

        }
    ]

    const handleCheckEmail = (data) => {
        // we send a request to server here.
        // if the response was 200, and the email exists in database
        // we set the mode to password and then render the Password and Confirm
        // password form.
        setMode(() => 'reset-password');
    }


    return (
        <div className={"mx-3 d-flex flex-column justify-content-between align-items-center h-100"}
             style={{color: theme.fadeTextColor, fontSize: appConfig.smallFontSize}}>
            <div>logo here</div>
            <div className="my-auto">
                <h3 style={{fontSize: appConfig.hugeFontSize}}> رمز ایمیل خود را فراموش کرده اید ؟</h3>
            </div>


            <div className={"w-100 mb-auto"}>
                {
                    mode === 'email' ? (
                        <FormBuilder
                            onFinish={handleCheckEmail}
                            fields={forgotPasswordFormFields}
                            submitButtonFlex={"center"}
                            submitButtonClasses={"px-5"}
                            additionalElement={
                                <div className={"my-5"}></div>
                            }
                            colXL={24}
                            colSM={24}
                        />
                    ) : (
                        <div className={"w-100 mb-auto"}>
                            <FormBuilder
                                fields={confirmPasswordFormFields}
                                submitButtonFlex={"center"}
                                submitButtonClasses={"px-5"}
                                colXL={24}
                                colSM={24}
                                size={'large'}
                                additionalElement={
                                    <div></div>
                                }

                            />
                        </div>
                    )
                }
            </div>


            <UnderlinedLink
                text={'بازگشت به صفخه ورود'}
                onElementClick={() => navigate('/login')}
            />
        </div>
    );
}

export default ForgotPassword;