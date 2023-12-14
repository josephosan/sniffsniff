import React from "react";
import {appConfig} from "../../config/app.config";
import FormBuilder from "../../components/primary/FormBuilder";
import {FormBuilderField} from "../../@types/app";
import {Button} from "antd";

const OrganizationSettings: React.FC = React.memo(() => {
    const updateInfoFields: FormBuilderField[] = [
        {
            label: 'نام',
            name: 'name',
            placeholder: 'نام سازمان',
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
                <h2>اطلاعات سازمان</h2>
                <p style={{fontSize: appConfig.smallFontSize}}>تنظیمات کلی سازمان</p>
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
                <h5>حذف سازمان</h5>
                <p className={"mt-4"} style={{fontSize: appConfig.smallFontSize}}>
                    با حذف یک سازمان همه اطلاعات مربوط به
                    آن من جمله پروژه های ذیل حذف خواهند شد.
                </p>
                <Button type={"primary"} danger>حذف</Button>
            </div>
        </>
    )
})

export default OrganizationSettings;