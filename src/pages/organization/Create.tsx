import React from "react";
import FormBuilder from "../../components/primary/FormBuilder";
import {FormBuilderField} from "../../@types/app";


const CreateOrganization: React.FC = () => {
    // todo: please use form builder, for creating a form like the design on figma.

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
            name: 'desc',
            type: 'textarea',
            label: 'توضیحات',
            placeholder: 'توضیحات',
            required: true,
            rules: [{required: true, message: 'وارد کردن توضیحات اجباری است'}],
        }
    ]

    return (
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
    );
}

export default CreateOrganization;