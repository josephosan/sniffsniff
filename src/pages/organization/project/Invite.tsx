import React, { useState } from 'react';
import FormBuilder from '../../../components/primary/FormBuilder';
import { FormBuilderField } from '../../../@types/app';
import { useMediaQuery } from 'react-responsive';
import { apiConfig, appConfig } from '../../../config/app.config';
import ProjectApiService from '../../../services/ProjectApiService';
import { useParams } from 'react-router-dom';
import { useNotify } from '../../../store/notify.store';

const ProjectInvite: React.FC = React.memo(() => {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const notify = useNotify();
    const isMobile = useMediaQuery({
        query: `(max-width: ${appConfig.appBreakPoint}px)`,
    });
    const createFormFields: FormBuilderField[] = [
        {
            name: 'userId',
            type: 'select',
            label: 'انتخاب کاربر',
            placeholder: 'انتخاب کنید',
            required: true,
            rules: [{ required: true, message: 'وارد کردن نام اجباری است' }],
            select_url: `${apiConfig.API_BASE_URL}/user/account/search`,
        },
    ];

    const handleSubmit = async (formData: any) => {
        setLoading(true);
        try {
            const res = await ProjectApiService.inviteUser({
                ...formData,
                projectId: params.projectId,
            });
            notify.showMessage('success', 'کاربر باموفقیت به پروژه اضافه شد.');
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column justify-content-between align-items-center">
            <div
                className="mt-5"
                style={{
                    minWidth: '300px',
                    width: isMobile ? '100%' : '',
                }}
            >
                <FormBuilder
                    fields={createFormFields}
                    submitButtonFlex={'start'}
                    colXL={24}
                    colSM={24}
                    fieldsPaddingLevel={'0'}
                    submitButtonLabel={'ارسال لینک دعوت'}
                    onFinish={handleSubmit}
                    loading={loading}
                />
            </div>
        </div>
    );
});

export default ProjectInvite;
