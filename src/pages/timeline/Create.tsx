import React, {useState} from "react";
import FormBuilder from "../../components/primary/FormBuilder";
import {FormBuilderField} from "../../@types/app";
import TimelineService from "../../services/TimelineService";
import {useNavigate} from "react-router-dom";
import {useNotify} from "../../store/notify.store";

const CreateTimeLine: React.FC = () => {
    const navigate = useNavigate();
    const notifyStore = useNotify();
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
                    colors: [
                        '#61A3BA',
                        '#C70039',
                        '#748E63',
                        '#FFCD4B',
                        '#CDFAD5',
                        '#141E46',
                        '#CE5A67',
                        '#B931FC',
                        '#FFA33C',
                        '#2d2a2e',
                    ]
                }
            ]
        },
        {
            name: "show_date",
            type: "checkbox",
            label: "تاریخ ها",
            placeholder: "نمایش تاریخ",
            checked: false
        }
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
        console.log(data);
    }

    return (
        <>
            <FormBuilder
                fields={createTimeLineFields}
                size={"middle"}
                onFinish={handleFormSubmit}
                loading={loading}
                valuesChange={onFormChange}
            />
        </>
    );
}

export default CreateTimeLine;