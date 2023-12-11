import React from "react";
import FormBuilder from "../../components/primary/FormBuilder";
import { FormBuilderField } from "../../@types/app";


const CreateOrganization: React.FC = () => {
    // todo: please use form builder, for creating a form like the design on figma.

    const createFormFields: FormBuilderField[] = [
        {
            placeholder: 'نام',
            name: 'name',
            type: 'text',
            rules: [{required: true, message: 'وارد کردن نام اجباری است'}]
        },
        {
            placeholder: 'توضیحات',
            name: 'Description',
            type: 'text',
            
        }
    ]

    return (
        <div className="d-flex flex-column justify-content-between align-items-center">
            
            <div className="w-25 mt-5">
              <FormBuilder
                    fields={createFormFields}
                    submitButtonFlex={"start"}
                    submitButtonClasses={"px-5"}
                    colXL={24}
                    colSM={24}
                    size={'large'}
                    fieldsPaddingLevel={"0"}
                />
            </div>
        </div>
    );
}

export default CreateOrganization;