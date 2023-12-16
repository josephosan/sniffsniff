import React from "react";
import {FormBuilderField} from "../../../@types/app";
import FormBuilder from "../../../components/primary/FormBuilder";

const CreateProject: React.FC = () => {
    const createFormFields: FormBuilderField[] = [
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
            rules: [{required: true, message: 'وارد کردن نوع اجباری است'}]
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
                        fields={createFormFields}
                        submitButtonFlex={"start"}
                        colXL={24}
                        colSM={24}
                        fieldsPaddingLevel={"0"}
                    />
                </div>
            </div>
        </>
    );
}

export default CreateProject;