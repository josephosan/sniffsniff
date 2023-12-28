import React from "react";
import {FormBuilderField} from "../../../@types/app";
import FormBuilder from "../../../components/primary/FormBuilder";
import ProjectApiService from "../../../services/ProjectApiService";
import { useNotify } from "../../../store/notify.store";
import { useNavigate } from "react-router-dom";


const CreateProject: React.FC = React.memo(() => {
    const notifyStore = useNotify();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
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
            rules: [{required: true, message: 'وارد کردن نوع اجباری است'}],
            options: [
                {
                    label: 'خصوصی',
                    value: 'private'
                },
                {
                    label: 'عمومی',
                    value: 'group'
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

    const handleSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await ProjectApiService.createOne(data);
            notifyStore.showMessage("success", "با موفقیت انجام شد.");
            navigate(`/organization/:organizationId/project/:projectId/term`);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }



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
                        submitButtonLabel={"ایجاد"}
                    />
                </div>
            </div>
        </>
    );
})

export default CreateProject;