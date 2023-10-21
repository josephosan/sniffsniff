import React from 'react';
import FormBuilder from '../components/primary/FormBuilder';
import ApiService from '../services/ApiService';
import { TableBuilder } from '../components/primary/TableBuilder';
import WrapperData from '../components/secondary/WrapperData';
import CustomSteps from '../components/secondary/CustomSteps';

export const Home: React.FC = () => {
    return (
        <>
            <div>
                <FormBuilder
                    fields={[
                        {
                            name: 'name',
                            placeholder: 'نام',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'last_name',
                            placeholder: 'نام خانوادگی',
                            type: 'text',
                        },
                        {
                            name: 'password',
                            placeholder: 'رمز عبور',
                            type: 'password',
                        },
                        {
                            name: 'price',
                            placeholder: 'قیمت',
                            type: 'number',
                        },
                        {
                            label: 'date',
                            required: true,
                            name: 'date',
                            placeholder: 'تاریخ',
                            type: 'date',
                        },
                        {
                            label: 'select',
                            name: 'select',
                            placeholder: 'اتنخاب',
                            type: 'select',
                            select_url: 'http://localhost:3001/users/select/',
                        },
                    ]}
                />

                <CustomSteps
                    items={[
                        {
                            title: 'عنوان',
                            description: 'شرح',
                        },
                        {
                            title: 'عنوان',
                            description: 'شرح',
                        },

                        {
                            title: 'عنوان',
                            description: 'شرح',
                        },
                        {
                            title: 'عنوان',
                            description: 'شرح',
                        },
                        {
                            title: 'عنوان',
                            description: 'شرح',
                        },
                    ]}
                />
            </div>

            <div>
                <WrapperData color={'red'}>item</WrapperData>
            </div>
        </>
    );
};
