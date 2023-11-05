import { useState } from 'react';
import FromBuilder from '../../components/primary/FormBuilder';
import { FormBuilderField } from '../../@types/app';

const CreateEvent: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const createEventFields: FormBuilderField[] = [
        {
            type: 'text',
            name: 'name',
            label: 'نام',
            placeholder: 'نام رویداد',
            required: true,
            rules: [{ required: true, message: 'پر کردن نام اجباری است' }],
        },
        {
            type: 'select',
            name: 'type',
            label: 'نوع',
            required: true,
            placeholder: 'نوع رویداد',
            rules: [
                {
                    required: true,
                    message: 'پرکردن نوع رویداد اجباری است!',
                },
            ],
            options: [
                {
                    label: 'گروه',
                    value: 'GROUP',
                },
                {
                    label: 'خصوصی',
                    value: 'PRIVATE',
                },
            ],
        },
        {
            type: 'text',
            name: 'description',
            label: 'توضیحات',
            required: true,
            placeholder: '...',
            rules: [
                {
                    required: true,
                    message: 'لطفا یک توضیح درباره این رویداد بنویسید!',
                },
            ],
        },
        {
            type: 'date_time',
            name: 'startDate',
            label: 'تاریخ شروع',
            required: true,
            placeholder: 'انتخاب تاریخ شروع',
            rules: [
                { required: true, message: 'انتخاب تاریخ شروع اجباری است!' },
            ],
        },
        {
            type: 'date_time',
            name: 'endDate',
            label: 'تاریخ پایان',
            placeholder: 'انتخاب تاریخ پایان',
        },
    ];

    return (
        <>
            <FromBuilder
                fields={createEventFields}
                size={'middle'}
                loading={loading}
                // onFinish={}
            />
        </>
    );
};
export default CreateEvent;
