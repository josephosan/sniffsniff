import React from 'react';
import FormBuilder from "../components/primary/FormBuilder";
import {FormBuilderField} from "../@types/app";

export const Home: React.FC = () => {
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
            required: true,
            placeholder: 'انتخاب تگ',
            rules: [{required: true, message: 'لطفا حداقل یک تگ انتخاب کنید'}],
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
            type: 'date_time',
            name: 'startDate',
            label: 'تاریخ شروع',
            required: true,
            placeholder: 'انتخاب تاریخ شروع',
            rules: [{required: true, message: 'انتخاب تاریخ شروع اجباری است!'}],
        },
        {
            type: 'date_time',
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
            rules: [{required: true, message: 'لطفا یک توضیح درباره این جدول زمانی بنویسید!'}],
        },
    ];
    return (
        <>
            <FormBuilder
                fields={createTimeLineFields}
            />
        </>
    );
};
