import React, {useState} from "react";
import FormBuilder from "../../components/primary/FormBuilder";
import {FormBuilderField} from "../../@types/app";
import TimelineService from "../../services/TimelineService";
import {useNavigate} from "react-router-dom";
import {useNotify} from "../../store/notify.store";
import {colors} from "../../config/app.config";
import FieldComponent from "../../components/primary/FieldComponent";

const CreateTimeLine: React.FC = () => {
    const navigate = useNavigate();
    const notifyStore = useNotify();
    const [showDate, setShowDate] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const createTimeLineFields: FormBuilderField[] = [
        {
            type: 'text',
            name: 'name',
            label: 'نام',
            required: true,
            placeholder: 'نام جدول زمانی',
            rules: [{required: true, message: 'پرکردن نام اجباری است!'}],
        },
        {
            type: 'select',
            name: 'type',
            label: 'نوع',
            required: true,
            placeholder: 'نوع جدول زمانی',
            rules: [{required: true, message: 'پرکردن نوع تجدول زمانی اجباری است!'}],
            options: [
                {
                    label: 'گروه',
                    value: 'GROUP'
                },
                {
                    label: 'خصوصی',
                    value: 'PRIVATE'
                }
            ]
        },
        {
            type: 'multi_select',
            name: 'tags',
            label: 'تگ ها',
            placeholder: 'انتخاب تگ',
            rules: [{required: true, message: 'انتخاب یک تگ اجباری است!'}],
            required: true,
            options: [
                {
                    label: 'گروه',
                    value: 'GROUP'
                },
                {
                    label: 'خصوصی',
                    value: 'PRIVATE'
                }
            ]
        },
        {
            type: 'textarea',
            name: 'description',
            label: 'توضیحات',
            required: true,
            placeholder: '...',
            rules: [{required: true, message: 'لطفا یک توضیح درباره این جدول زمانی بنویسید!'}],
            rows: 10,
            maxLength: 3,
            no_resize: true
        },
        {
            type: 'color',
            name: 'color',
            label: 'رنگ',
            colorPresets: [
                {
                    label: 'رنگ های پیشفرض',
                    colors
                }
            ]
        },
        {
            name: "show_date",
            type: "checkbox",
            label: "تاریخ ها",
            placeholder: "نمایش تاریخ",
            initialValue: false
        }
    ];
    const dateFields = [
        <FieldComponent
            name={"start_date"}
            type={"date_time"}
            minDate={new Date().setMinutes(new Date().getMinutes() + 5)}
            key={"start_date"}
            label={"تاریخ شروع"}
        />,
        <FieldComponent
            name={"end_date"}
            type={"date_time"}
            minDate={new Date().setMinutes(new Date().getMinutes() + 5)}
            key={"end_date"}
            label={"تاریخ پایان "}
        />
    ];

    const handleFormSubmit = async (formData) => {
        setLoading(() => true);
        try {
            const res = await TimelineService.createTimeline(formData);
            notifyStore.showAlert('success', 'موفق!', 'جدول زمانی با موقفیت ایجاد شد!')
            navigate(`/timeline/edit/${res.data.data.id}`);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(() => false);
        }
    }

    const onFormChange = (data) => {
        if (Object.keys(data).indexOf("show_date") > -1) setShowDate(() => data['show_date']);
    }

    return (
        <>
            <FormBuilder
                fields={createTimeLineFields}
                size={"middle"}
                onFinish={handleFormSubmit}
                loading={loading}
                valuesChange={onFormChange}
                additionalFields={
                    showDate && dateFields.map(el => el)
                }
            />
        </>
    );
}

export default CreateTimeLine;