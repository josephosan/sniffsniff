import { FormBuilderField } from '../../../@types/app';
import FormBuilder from '../../../components/primary/FormBuilder';
import FormSkeletonLoading from '../../../components/secondary/FormSkeletonLoading';
import BigBoxSkeletonLoading from '../../../components/secondary/BigBoxSkeletonLoading';
import TimelineService from '../../../services/TimelineService';
import { json, useParams } from 'react-router-dom';
import { useNotify } from '../../../store/notify.store';
import { useState, useEffect } from 'react';

const EditEvent: React.FC = () => {
    const [fetching, setFetching] = useState<boolean>(true);
    const [editSubmitLoading, setEditSubmitLoading] = useState<boolean>(false);
    const [editFormInitialValues, setEditFormInitialValues] =
        useState<never>(null);
    const notifyStore = useNotify();

    const { id } = useParams();

    const editEventFields: FormBuilderField[] = [
        {
            type: 'text',
            name: 'title',
            label: 'نام',
            placeholder: 'نام رویداد',
            required: true,
            rules: [{ required: true, message: 'پر کردن نام اجباری است' }],
        },
        {
            type: 'select',
            name: 'type',
            label: 'نوع',
            required: true,
            placeholder: 'نوع رویداد',
            rules: [
                {
                    required: true,
                    message: 'پرکردن نوع رویداد اجباری است!',
                },
            ],
            options: [
                {
                    label: 'امتحان',
                    value: 'EXAM',
                },
            ],
        },
        {
            type: 'text',
            name: 'description',
            label: 'توضیحات',
            required: true,
            placeholder: '...',
            rules: [
                {
                    required: true,
                    message: 'لطفا یک توضیح درباره این رویداد بنویسید!',
                },
            ],
        },
        {
            type: 'date_time',
            name: 'startDate',
            label: 'تاریخ شروع',
            required: true,
            placeholder: 'انتخاب تاریخ شروع',
            rules: [
                { required: true, message: 'انتخاب تاریخ شروع اجباری است!' },
            ],
        },
        {
            type: 'date_time',
            name: 'endDate',
            label: 'تاریخ پایان',
            placeholder: 'انتخاب تاریخ پایان',
        },
    ];

    useEffect(() => {
        if (!id) return;

        async function fetchData() {
            try {
                const { data } = await TimelineService.getTimelineEvent(id);
                setEditFormInitialValues(() => {
                    return data.data;
                });
            } catch (e) {
                console.log(e);
            } finally {
                setFetching(() => false);
            }
        }

        fetchData();
    }, [id]);

    const handleEditFormSubmit = async (formData) => {
        setEditSubmitLoading(() => true);
        try {
            const response = await TimelineService.editEventById(id, formData);
            notifyStore.showAlert('success', 'موفق!', 'با موفقیت ویرایش شد.');
        } catch (e) {
            console.log(e);
        } finally {
            setEditSubmitLoading(() => false);
        }
    };

    return (
        <>
            {fetching ? (
                <>
                    <FormSkeletonLoading />
                    <br />
                    <div className={'w-100 row'}>
                        <div className={'col-sm d-flex justify-content-center'}>
                            <BigBoxSkeletonLoading />
                        </div>
                        <div className={'col-sm d-flex justify-content-center'}>
                            <BigBoxSkeletonLoading />
                        </div>
                    </div>
                </>
            ) : (
                <FormBuilder
                    initialValues={editFormInitialValues}
                    fields={editEventFields}
                    size={'middle'}
                    loading={editSubmitLoading}
                    onFinish={handleEditFormSubmit}
                    submitButtonLabel="ویرایش"
                />
            )}
        </>
    );
};

export default EditEvent;

//skeleton should change
