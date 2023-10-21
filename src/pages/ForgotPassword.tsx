import React from "react";
import {useApp} from "../store/app.store";
import FormBuilder from "../components/primary/FormBuilder";
import {FormBuilderField} from "../@types/app";
import {appConfig} from "../config/app.config";
import {useNavigate} from "react-router-dom";
import UnderlinedLink from "../components/secondary/UnderlinedLink";


const ForgotPassword: React.FC = () => {
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

    const handleCheckEmail = (data) => {
        console.log(data);
    }

    return (
        <div className={"mx-3 d-flex flex-column justify-content-between align-items-center h-100"}
             style={{color: theme.fadeTextColor, fontSize: appConfig.smallFontSize}}>
            <div>logo here</div>
            <div className="my-auto">
                <h3 style={{fontSize: appConfig.hugeFontSize}}> رمز ایمیل خود را فراموش کرده اید ؟</h3>
            </div>


            <div className={"w-100 mb-auto"}>
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
            </div>


            <UnderlinedLink
                text={'بازگشت به صفخه ورود'}
                onElementClick={() => navigate('/login')}
            />
        </div>
    );
}

export default ForgotPassword;