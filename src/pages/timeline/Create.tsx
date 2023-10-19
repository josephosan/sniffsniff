import React from "react";
import FormBuilder from "../../components/primary/FormBuilder";
import {FormBuilderField} from "../../@types/app";
import DatePicker from "react-multi-date-picker";

const CreateTimeLine: React.FC = () => {
    const createTimeLineFields: FormBuilderField[] = [
        {
            type: 'text',
            name: 'name',
            label: 'نام',
            required: true,
            placeholder: 'نام جدول زمانی',
            rules: [{required: true, message: 'فیلد نام اجباری است!'}],
        },
        {
            type: 'select',
            name: 'type',
            label: 'نوع',
            required: true,
            placeholder: 'نوع جدول زمانی',
            rules: [{required: true, message: 'فیلد نوع تجدول زمانی اجباری است!'}],
            options: [
                {
                    label: 'گروه',
                    value: 'group'
                },
                {
                    label: 'خصوصی',
                    value: 'private'
                }
            ]
        },
        {
            type: 'multi_select',
            name: 'tags',
            label: 'تگ ها',
            required: true,
            placeholder: 'انتخاب تگ',
            rules: [{required: true, message: 'لطفا حداقل یک تگ انتخاب کنید'}],
            options: [
                {
                    label: 'گروه',
                    value: 'group'
                },
                {
                    label: 'خصوصی',
                    value: 'private'
                }
            ]
        },
        {
            type: 'date',
            name: 'startِِDate',
            label: 'تاریخ شروع',
            required: true,
            placeholder: 'انتخاب تاریخ شروع',
            rules: [{required: true, message: 'انتخاب تاریخ شروع اجباری است!'}],
        },
        {
            type: 'date',
            name: 'endDate',
            label: 'تاریخ پایان',
            placeholder: 'انتخاب تاریخ پایان',
        },
        {
            type: 'text',
            name: 'description',
            label: 'توضیحات',
            required: true,
            placeholder: '...',
            rules: [{required: true, message: 'لطفا یک توضیخ درباره این جدول زمانی بنویسید!'}],
        },
    ];

    const handleFormSubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <FormBuilder
                fields={createTimeLineFields}
                size={"middle"}
                onFinish={handleFormSubmit}
            />

            <DatePicker />
        </>
    );
}

export default CreateTimeLine;