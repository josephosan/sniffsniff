import React, { useRef, useState } from 'react';

import TextItemWrapper from '../../components/tiny/TextItemWrapper';
import { appConfig } from '../../config/app.config';
import { FormBuilderField } from '../../@types/app';
import { useNotify } from '../../store/notify.store';

import FormBuilder from '../../components/primary/FormBuilder';

const PasswordSettings: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const notifyStore = useNotify();

    const updatePasswordFields = useRef<FormBuilderField[]>([
        {
            label: 'گذرواژه فعلی',
            name: 'name',
            placeholder: '...',
            type: 'text',
            required: true,
            rules: [{ required: true, message: '' }],
        },
        {
            label: 'گذرواژه جدید',
            name: 'password',
            type: 'text',
            placeholder: '...',
            required: true,
            rules: [{ required: true, message: '' }],
        },
        {
            label: 'تکرار گذرواژه جدید',
            name: 'repeatPassword',
            type: 'text',
            placeholder: '...',
            required: true,
            rules: [{ required: true, message: '' }],
        },
    ]);

    const handleUpdate = async (formData) => {
        if (formData.password === formData.repeatPassword) {
            setLoading(true);
            try {
                // const { data } = await updateOne(
                // );
                // notifyStore.showMessage('success', 'با موفقیت ویرایش شد.');
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        } else {
            notifyStore.showMessage(
                'error',
                ' گذرواژه جدید و تکرار آن باید یکسان باشند ',
            );
            return;
        }
    };

    return (
        <div style={{ height: '70vh' }} className="px-3 pt-2">
            <div className="d-flex flex-column ">
                <TextItemWrapper
                    text="گذرواژه "
                    fontSize={appConfig.hugeFontSize + 10}
                />
                <TextItemWrapper
                    text="تنظیمات گذرواژه"
                    fontSize={appConfig.smallFontSize}
                />
            </div>
            <hr />

            <div>
                <TextItemWrapper
                    text="تغییر گذرواژه"
                    fontSize={appConfig.hugeFontSize}
                />

                <div
                    className={' mt-3 mt-4 px-2'}
                    style={{ maxWidth: '385px' }}
                >
                    <FormBuilder
                        fields={updatePasswordFields.current}
                        colSM={'24'}
                        colXL={'24'}
                        colXS={'24'}
                        fieldsPaddingLevel={'0'}
                        submitButtonLabel={'انجام'}
                        onFinish={handleUpdate}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};
export default PasswordSettings;
