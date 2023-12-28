import React, {useState} from "react";
import FormBuilder from "../../components/primary/FormBuilder";
import {FormBuilderField} from "../../@types/app";
import OrganizationApiService from "../../services/OrganizationApiService";
import {useNotify} from "../../store/notify.store";
import {useNavigate} from "react-router-dom";


const CreateOrganization: React.FC = React.memo(() => {
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
<<<<<<< HEAD
        
        {
            name: 'desc',
=======
        {
            name: 'description',
>>>>>>> master
            type: 'textarea',
            label: 'توضیحات',
            placeholder: 'توضیحات',
            required: true,
            rules: [{required: true, message: 'وارد کردن توضیحات اجباری است'}],
        }
    ];

    const handleSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await OrganizationApiService.createOne(data);
            notifyStore.showMessage("success", "با موفقیت انجام شد.");
            navigate(`/organization`);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="d-flex flex-column justify-content-between align-items-center">
            <div className="mt-5">
                <FormBuilder
                    fields={createFormFields}
                    submitButtonFlex={"start"}
                    colXL={24}
                    colSM={24}
                    fieldsPaddingLevel={"0"}
                    submitButtonLabel={"ایجاد"}
                    onFinish={handleSubmit}
                    loading={loading}
                />
            </div>
        </div>
    );
})

export default CreateOrganization;