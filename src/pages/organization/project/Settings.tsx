import React from "react";
import {FormBuilderField} from "../../../@types/app";
import {appConfig} from "../../../config/app.config";
import FormBuilder from "../../../components/primary/FormBuilder";
import {Button} from "antd";

const ProjectSettings: React.FC = React.memo(() => {
    const updateInfoFields: FormBuilderField[] = [
        {
            label: 'نام',
            name: 'name',
            placeholder: 'نام پروژه',
            type: 'text',
            required: true,
            rules: [{required: true, message: 'نام اجباری است!'}]
        },
        {
            label: 'توضیحات',
            name: 'desc',
            type: 'textarea',
            placeholder: 'توضیحات',
            required: true,
            rules: [{required: true, message: 'توضیحات اجباری است!'}]
        },
    ]


    return (
        <>
            <div className={"px-3 pt-2"}>
                <h2>اطلاعات پروژه</h2>
                <p style={{fontSize: appConfig.smallFontSize}}>تنظیمات کلی پروژه</p>
            </div>

            <hr/>

            <div className={"px-3 pt-2"}>
                <h5>ویرایش اطلاعات</h5>
                <div className={"mt-4 px-2"} style={{maxWidth: "300px"}}>
                    <FormBuilder
                        fields={updateInfoFields}
                        colSM={"24"}
                        colXL={"24"}
                        colXS={"24"}
                        fieldsPaddingLevel={"0"}
                    />
                </div>
            </div>

            <hr/>

            <div className={"px-3 pt-2"}>
                <h5>حذف پروژه</h5>
                <p className={"mt-4"} style={{fontSize: appConfig.smallFontSize}}>
                    با حذف یک پروژه همه اطلاعات مربوط به
                    آن من جمله پروژه های ذیل حذف خواهند شد.
                </p>
                <Button type={"primary"} danger>حذف</Button>
            </div>
        </>
    )
});

export default ProjectSettings;