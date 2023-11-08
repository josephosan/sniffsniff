import React, { useState } from 'react';
import FormBuilder from '../../../components/primary/FormBuilder';
import { FormBuilderField } from '../../../@types/app';
import TimelineService from "../../../services/TimelineService";
import {useNavigate, useParams} from "react-router-dom";
import {AxiosResponse} from "axios";
import {useNotify} from "../../../store/notify.store";

const CreateEvent: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { timelineId } = useParams();
    const notifyStore = useNotify();
    const navigate = useNavigate();

    const createEventFields: FormBuilderField[] = [
        {
            type: 'text',
            name: 'title',
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
                    label: 'امتحان',
                    value: 'EXAM',
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

    const handleCreateEvent = async (formData) => {
        try {
            const res: AxiosResponse = await TimelineService.createEventForTimeline(timelineId, formData);
            notifyStore.showAlert('success', 'موفق!', 'رویداد با موفقیت به جدول زمانی اضافه شد.');
            navigate(`timeline/edit/${timelineId}`);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(() => false);
        }
    }

    return (
        <>
            <FormBuilder
                fields={createEventFields}
                size={'middle'}
                loading={loading}
                onFinish={handleCreateEvent}
            />
        </>
    );
};
export default CreateEvent;
