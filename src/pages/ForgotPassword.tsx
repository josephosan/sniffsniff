import React from "react";
import { useApp } from "../store/app.store";
import FormBuilder from "../components/primary/FormBuilder";
import { FormBuilderField } from "../@types/app";
import {appConfig} from "../config/app.config";
import {useNavigate} from "react-router-dom";


const ForgotPassword: React.FC = () => {
    const { theme } = useApp();
    const navigate = useNavigate();
    const forgotPasswordFormFields: FormBuilderField[] = [
        {
            placeholder: 'ایمیل',
            name: 'email',
            rules: [{required: true, message: 'فیلد ایمیل اجباری است!'}],
            type: 'text'
        }
       
    ]
    return (
        <div className={"mx-3 d-flex flex-column justify-content-between align-items-center h-100"} style={{color: theme.fadeTextColor, fontSize: appConfig.smallFontSize}}>
            <div>logo here</div>
            <div className="my-auto">
                <h3 style={{fontSize: appConfig.hugeFontSize}}> رمز ایمیل خود را فراموش کرده اید ؟</h3>
            </div>
            <div className={"w-100 mb-auto"}>
                <FormBuilder
                    fields={forgotPasswordFormFields}
                    submitButtonFlex={"center"}
                    submitButtonClasses={"px-5"}
                    additionalElement={
                       <div></div>
                    }
                    colXLSpan={24}
                    colSMSpan={24}
                />
            </div>
            
                <div>
                <span
                onClick={() => navigate('/login')}
                style={{
                    textDecoration: "underline",
                    paddingBottom: '3px',
                    textDecorationSkipInk: 'none',
                    textDecorationColor: theme.primaryColor,
                    cursor: 'pointer'
                }}
            >بازگشت به صفحه ورود</span>
            
            </div>
        </div>
    );
}

export default ForgotPassword;