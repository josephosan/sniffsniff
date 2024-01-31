import React, { useState } from 'react';
import { Divider, Button, ConfigProvider } from 'antd';
import { useApp } from '../store/app.store';
import { appConfig } from '../config/app.config';
import FormBuilder from '../components/primary/FormBuilder';
import { FormBuilderField } from '../@types/app';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { useNotify } from '../store/notify.store';
import UnderlinedLink from '../components/secondary/UnderlinedLink';

const Register: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { theme } = useApp();
    const navigate = useNavigate();
    const notify = useNotify();
    const registerFormFields: FormBuilderField[] = [
        {
            placeholder: 'نام',
            name: 'name',
            type: 'text',
            rules: [{ required: true, message: '' }],
        },
        {
            placeholder: 'ایمیل',
            name: 'email',
            rules: [{ required: true, message: '' }],
            type: 'text',
        },
        {
            placeholder: 'رمز عبور',
            name: 'password',
            type: 'password',
            rules: [{ required: true, message: '' }],
        },
    ];

    const handleRegisterSubmit = async (formData: {
        username: string;
        password: string;
        name: string;
    }) => {
        setLoading(() => true);
        try {
            const registerRes = await AuthService.register(formData);

            notify.showAlert(
                'success',
                'عملیات موفق',
                'ثبت نام با موفقیت انجام شد. لطفا وارد شوید.',
            );
            navigate('/login');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(() => false);
        }
    };

    return (
        <div
            className={
                'mx-3 d-flex flex-column justify-content-between align-items-center h-100'
            }
            style={{
                color: theme.fadeTextColor,
                fontSize: appConfig.smallFontSize,
            }}
        >
            <div>logo here</div>
            <div className={'mt-5'}>
                <h3 style={{ fontSize: appConfig.hugeFontSize }}>
                    به اجوایونت خوش آمدید!
                </h3>
            </div>
            <div className={'w-100 mt-3'}>
                <ConfigProvider direction={'ltr'}>
                    <div
                        style={{
                            direction: 'ltr',
                        }}
                    >
                        <FormBuilder
                            fields={registerFormFields}
                            submitButtonFlex={'center'}
                            submitButtonClasses={'px-5'}
                            colXL={24}
                            colSM={24}
                            size={'large'}
                            onFinish={handleRegisterSubmit}
                            submitButtonLoading={loading}
                            fieldsPaddingLevel={'0'}
                            additionalElement={<div></div>}
                        />
                    </div>
                </ConfigProvider>
            </div>

            <div className={'w-100 px-5 mb-4'}>
                <Divider className={'my-0'}>یا</Divider>
            </div>
            <Button
                size="large"
                style={{ backgroundColor: theme.cardBg }}
                htmlType="submit"
                className={'mb-3'}
            >
                <i className="bi bi-google"></i>
                <span className="mx-2">ورود با گوگل</span>
            </Button>

            <UnderlinedLink
                text={'ورود به حساب کاربری'}
                onElementClick={() => navigate('/login')}
            />
        </div>
    );
};

export default Register;
