import React from "react";
import { FormBuilderField } from "../../../../@types/app";
import FormBuilder from "../../../../components/primary/FormBuilder";

const CreateTerm: React.FC = () => {
    const createTermFormFields: FormBuilderField[] = [
        {
            name: 'type',
            type: 'select',
           
            placeholder: 'نوع',
            options: [{ label: 'یادآور', value: 'reminder' },
                { label: 'تسک', value: 'task' },
                { label: 'رویداد', value: 'event' },
                
            ]
           
           
        }
    ]
    return (
        <>
          <div className="d-flex flex-column justify-content-between align-items-center">
            <div className="mt-5">
                <FormBuilder
                    fields={createTermFormFields}
                    submitButtonFlex={"center"}
                    colXL={96}
                    colSM={96}
                    fieldsPaddingLevel={"0"}
                    submitButtonLabel={"ایجاد"}
                />
            </div>
        </div>  
        </>
    );
}

export default CreateTerm;