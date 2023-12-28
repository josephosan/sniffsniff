import React, {useRef, useState} from "react";
import {appConfig} from "../../config/app.config";
import FormBuilder from "../../components/primary/FormBuilder";
import {FormBuilderField} from "../../@types/app";
import {Button} from "antd";
import OrganizationApiService from "../../services/OrganizationApiService";
import {useParams} from "react-router-dom";
import {useNotify} from "../../store/notify.store";
import Emitter from "../../helpers/emitter.helper";

const OrganizationSettings: React.FC = () => {
    const params = useParams();
    const notifyStore = useNotify();
    const [loading, setLoading] = useState(false);
    const updateInfoFields = useRef<FormBuilderField[]>([
        {
            label: 'نام',
            name: 'name',
            placeholder: 'نام سازمان',
            type: 'text',
        },
        {
            label: 'توضیحات',
            name: 'description',
            type: 'textarea',
            placeholder: 'توضیحات',
        },
    ]);

    const handleUpdate = async (formData) => {
        setLoading(true);
        try {
            const {data} = await OrganizationApiService.updateOne(params.organizationId, formData);
            notifyStore.showMessage('success', 'با موفقیت ویرایش شد.');
            Emitter.emit('organization:update');
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

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
                        fields={updateInfoFields.current}
                        colSM={"24"}
                        colXL={"24"}
                        colXS={"24"}
                        fieldsPaddingLevel={"0"}
                        onFinish={handleUpdate}
                        loading={loading}
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
}

export default OrganizationSettings;