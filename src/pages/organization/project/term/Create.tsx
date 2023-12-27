import React from "react";
import {FormBuilderField} from "../../../../@types/app";
import FormBuilder from "../../../../components/primary/FormBuilder";

const CreateTerm: React.FC = () => {
    const createTermFormFields: FormBuilderField[] = [
    {
            name: 'name',
            type: 'text',
            label: 'نام',
            placeholder: 'نام',
            required: true,
            rules: [{required: true, message: 'وارد کردن نام اجباری است'}]
        },
        {
            name: 'type',
            type: 'select',
            label: 'نوع',
            placeholder: 'نوع',
            required: true,
            rules: [{required: true, message: 'وارد کردن نوع اجباری است'}],
            options: [{label: 'یادآور', value: 'reminder'},
                {
                    label: 'تسک',
                    value: 'task'
                },
                {
                    label: 'رویداد',
                    value: 'event'
                },

            

            ]
        },
        
        {
            name: 'desc',
            type: 'textarea',
            label: 'توضیحات',
            placeholder: 'توضیحات',
            required: true,
            rules: [{required: true, message: 'وارد کردن توضیحات اجباری است'}],
        }
    ]
    return (
        <>
            <div className="d-flex flex-column justify-content-between align-items-center">
                <div className="mt-5">
                    <FormBuilder
                        fields={createTermFormFields}
                        submitButtonFlex={"center"}
                        colXL={24}
                        colSM={24}
                        fieldsPaddingLevel={"0"}
                        submitButtonLabel={"ایجاد"}
                    />
                </div>
            </div>
        </>
    );
}

export default CreateTerm;