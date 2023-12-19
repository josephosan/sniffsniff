import React from "react";
import FormBuilder from "../../../components/primary/FormBuilder";
import {FormBuilderField} from "../../../@types/app";
import {useMediaQuery} from "react-responsive";
import {appConfig} from "../../../config/app.config";


const ProjectInvite: React.FC = React.memo(() => {
    const isMobile = useMediaQuery({
        query: `(max-width: ${appConfig.appBreakPoint}px)`,
    });
    const createFormFields: FormBuilderField[] = [
        {
            name: 'users',
            type: 'tags',
            label: 'کاربران',
            placeholder: 'انتخاب کنید',
            required: true,
            rules: [{required: true, message: 'وارد کردن نام اجباری است'}]
        },
    ]

    return (
        <div className="d-flex flex-column justify-content-between align-items-center">
            <div
                className="mt-5"
                style={{
                    minWidth: "300px",
                    width: isMobile ? "100%" : ""
                }}
            >
                <FormBuilder
                    fields={createFormFields}
                    submitButtonFlex={"start"}
                    colXL={24}
                    colSM={24}
                    fieldsPaddingLevel={"0"}
                    submitButtonLabel={"ارسال لینک دعوت"}
                />
            </div>
        </div>
    );
})

export default ProjectInvite;