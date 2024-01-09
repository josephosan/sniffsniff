import React, { useState } from 'react';
import FormBuilder from '../../../../../components/primary/FormBuilder';
import { FormBuilderField } from '../../../../../@types/app';
import TermService from '../../../../../services/TermService';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useNotify } from '../../../../../store/notify.store';

const CreateTaskTerm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const notify = useNotify();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const createFormFields: FormBuilderField[] = [
        {
            name: 'title',
            type: 'text',
            label: 'نام',
            placeholder: 'نام',
            required: true,
            rules: [{ required: true, message: 'وارد کردن نام اجباری است' }],
        },
        {
            name: 'status',
            type: 'select',
            label: 'نوع',
            placeholder: 'اننتخاب کنید',
            required: true,
            rules: [{ required: true, message: 'وارد کردن نوع اجباری است' }],
            options: [
                {
                    label: 'TODO',
                    value: 'TODO',
                    icon: 'bi bi-list-task mt-1',
                },
            ],
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'توضیحات',
            placeholder: 'توضیحات',
            required: true,
            rules: [
                { required: true, message: 'وارد کردن توضیحات اجباری است' },
            ],
        },
    ];

    const handleSubmit = async (data: any) => {
        setLoading(true);

        try {
            const res = await TermService.createTask({
                ...data,
                projectId: params.projectId,
            });
            notify.showMessage('success', 'با موفقیت انجام شد.');
            navigate(
                `/organization/${params.organizationId}/project/${
                    params.projectId
                }/term/${res.data.data.id}?type=${query.get('type')}`,
            );
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="d-flex flex-column justify-content-between align-items-center">
                <div className="mt-5">
                    <FormBuilder
                        fields={createFormFields}
                        submitButtonFlex={'start'}
                        colXL={24}
                        colSM={24}
                        fieldsPaddingLevel={'0'}
                        submitButtonLabel={'ایجاد'}
                        onFinish={handleSubmit}
                        loading={loading}
                    />
                </div>
            </div>
        </>
    );
};

export default CreateTaskTerm;
