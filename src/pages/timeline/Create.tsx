import React from "react";
import FormBuilder from "../../components/primary/FormBuilder";
import {FormBuilderField} from "../../@types/app";

const CreateTimeLine: React.FC = () => {
    const createTimeLineFields: FormBuilderField[] = [
        {
            type: 'text',
            name: 'name',
            label: 'نام',
            required: true,
            placeholder: 'نام تایم لاین',
            rules: [{required: true, message: 'فیلد نام اجباری است!'}],
        },
        {
            type: 'select',
            name: 'type',
            label: 'نوع',
            required: true,
            placeholder: 'نوع تایم لاین',
            // rules: [{required: true, message: 'فیلد نوع تایم لاین اجباری است!'}],
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
            // rules: [{required: true, message: 'لطفا حداقل یک تگ انتخاب کنید'}],
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
            name: 'start_date',
            label: 'تاریخ شروع',
            required: true,
            placeholder: 'انتخاب تاریخ شروع',
            // rules: [{required: true, message: 'لطفا حداقل یک تگ انتخاب کنید'}],
        },
        {
            type: 'date',
            name: 'end_date',
            label: 'تاریخ پایان',
            required: true,
            placeholder: 'انتخاب تاریخ پایان',
            // rules: [{required: true, message: 'لطفا حداقل یک تگ انتخاب کنید'}],
        },
        {
            type: 'text',
            name: 'desc',
            label: 'توضیحات',
            required: true,
            placeholder: '...',
            // rules: [{required: true, message: 'لطفا حداقل یک تگ انتخاب کنید'}],
        },
    ]
    return (
        <>
            <FormBuilder
                fields={createTimeLineFields}
                size={'middle'}
            />
        </>
    );
}

export default CreateTimeLine;