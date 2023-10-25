import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import FormSkeletonLoading from "../../components/secondary/FormSkeletonLoading";
import BigBoxSkeletonLoading from "../../components/secondary/BigBoxSkeletonLoading";
import TimelineService from "../../services/TimelineService";
import {FormBuilderField} from "../../@types/app";
import FormBuilder from "../../components/primary/FormBuilder";
import BorderedDataWrapper from "../../components/secondary/BorderedDataWrapper";
import CustomSearch from "../../components/primary/CustomSearch";
import {Button} from "antd";

const EditTimeLine: React.FC = () => {
    const {id} = useParams();
    const [fetching, setFetching] = useState<boolean>(true);
    const [editSubmitLoading, setEditSubmitLoading] = useState<boolean>(false);
    const editTimelineFields: FormBuilderField[] = [
        {
            type: 'text',
            name: 'name',
            label: 'نام',
            required: true,
            placeholder: 'نام جدول زمانی',
            rules: [{required: true, message: 'فیلد نام اجباری است!'}],
        },
        {
            type: 'select',
            name: 'type',
            label: 'نوع',
            required: true,
            placeholder: 'نوع جدول زمانی',
            rules: [{required: true, message: 'فیلد نوع تجدول زمانی اجباری است!'}],
            options: [
                {
                    label: 'گروه',
                    value: 'GROUP'
                },
                {
                    label: 'خصوصی',
                    value: 'PRIVATE'
                }
            ]
        },
        {
            type: 'multi_select',
            name: 'tags',
            label: 'تگ ها',
            required: true,
            placeholder: 'انتخاب تگ',
            rules: [{required: true, message: 'لطفا حداقل یک تگ انتخاب کنید'}],
            options: [
                {
                    label: 'گروه',
                    value: 'GROUP'
                },
                {
                    label: 'خصوصی',
                    value: 'PRIVATE'
                }
            ]
        },
        {
            type: 'date_time',
            name: 'startDate',
            label: 'تاریخ شروع',
            required: true,
            placeholder: 'انتخاب تاریخ شروع',
            rules: [{required: true, message: 'انتخاب تاریخ شروع اجباری است!'}],
        },
        {
            type: 'date',
            name: 'endDate',
            label: 'تاریخ پایان',
            placeholder: 'انتخاب تاریخ پایان',
        },
        {
            type: 'text',
            name: 'description',
            label: 'توضیحات',
            required: true,
            placeholder: '...',
            rules: [{required: true, message: 'لطفا یک توضیخ درباره این جدول زمانی بنویسید!'}],
        },
    ];

    useEffect(() => {
        if (!id) return;

        async function fetchData() {
            try {
                const res = await TimelineService.getATimeline(id);
                // todo: handle set initial values
            } catch (e) {
                console.log(e);
            } finally {
                setFetching(() => false);
            }
        }

        fetchData();
    }, [id]);

    const handleEditFormSubmit = (data) => {
        console.log('edit', data);
    }

    return (
        <>
            {
                fetching ? (
                    <>
                        <FormSkeletonLoading/>
                        <br/>
                        <div className={"w-100 row"}>
                            <div className={"col-sm d-flex justify-content-center"}><BigBoxSkeletonLoading/></div>
                            <div className={"col-sm d-flex justify-content-center"}><BigBoxSkeletonLoading/></div>
                        </div>
                    </>
                ) : (
                    <div>
                        <FormBuilder
                            fields={editTimelineFields}
                            size={"middle"}
                            onFinish={handleEditFormSubmit}
                            loading={editSubmitLoading}
                            submitButtonLabel={"ویرایش"}
                        />

                        <div className={"row mt-5"}>
                            <div className={"col-sm d-flex justify-content-center align-items-center"}>
                                <BorderedDataWrapper
                                    title={"اعضا"}
                                    required={true}
                                >
                                    <div className={"row"}>
                                        <div className={"col-sm-8 col-md-6 col-xl-6 col-7"}>
                                            <CustomSearch
                                                inputMode={true}
                                            />
                                        </div>
                                        <div className={"col-sm-4 col-md-6 col-xl-6 col-5 d-flex justify-content-end"}>
                                            <Button
                                                type={"primary"}
                                                icon={<i className={"bi bi-plus"}></i>}
                                            >
                                                افزودن
                                            </Button>
                                        </div>
                                    </div>
                                </BorderedDataWrapper>
                            </div>
                            <div className={"col-sm d-flex justify-content-center align-items-center"}>
                                <BorderedDataWrapper
                                    title={"رویداد ها"}
                                    required={true}
                                >
                                    <div className={"row"}>
                                        <div className={"col-sm-8 col-md-6 col-xl-6 col-7"}>
                                            <CustomSearch
                                                inputMode={true}
                                            />
                                        </div>
                                        <div className={"col-sm-4 col-md-6 col-xl-6 col-5 d-flex justify-content-end"}>
                                            <Button
                                                type={"primary"}
                                                icon={<i className={"bi bi-plus"}></i>}
                                            >
                                                افزودن
                                            </Button>
                                        </div>
                                    </div>
                                </BorderedDataWrapper>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default EditTimeLine;