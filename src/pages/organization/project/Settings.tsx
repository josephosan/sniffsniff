import React, {useState} from "react";
import {FormBuilderField} from "../../../@types/app";
import {appConfig} from "../../../config/app.config";
import FormBuilder from "../../../components/primary/FormBuilder";
import {Button} from "antd";
import Emitter from "../../../helpers/emitter.helper";
import ProjectApiService from "../../../services/ProjectApiService";
import {useParams} from "react-router-dom";
import {useNotify} from "../../../store/notify.store";

const ProjectSettings: React.FC = React.memo(() => {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const notifyStore = useNotify();
    const updateInfoFields: FormBuilderField[] = [
        {
            label: 'نام',
            name: 'name',
            placeholder: 'نام پروژه',
            type: 'text',
            required: true,
        },
        {
            label: 'توضیحات',
            name: 'description',
            type: 'textarea',
            placeholder: 'توضیحات',
        },
    ]
    const handleUpdate = async (formData) => {
        setLoading(true);
        try {
            const {data} = await ProjectApiService.updateOne(params.projectId, formData);
            notifyStore.showMessage('success', 'با موفقیت ویرایش شد.');
            Emitter.emit('project:update');
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

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
                        onFinish={handleUpdate}
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