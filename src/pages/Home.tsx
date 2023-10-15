import React from "react";
import FormBuilder from "../components/primary/FormBuilder";
import ApiService from "../services/ApiService";
import {TableBuilder} from "../components/primary/TableBuilder";
import {WrapperData} from "../components/secondary/WrapperData";

export const Home: React.FC = () => {
    const handleSendFakeReq = () => {
        ApiService.get('http://localhost:3001/tst/')
            .then(res => {
                console.log(res);
            })
    }


    return (
        <>
            <div>
                <FormBuilder
                    onFinish={handleSendFakeReq}
                    fields={
                        [
                            {
                                name: "name",
                                placeholder: "نام",
                                type: "text",
                                required: true
                            },
                            {
                                name: "last_name",
                                placeholder: "نام خانوادگی",
                                type: "text"
                            },
                            {
                                name: "password",
                                placeholder: "رمز عبور",
                                type: "password",
                            },
                            {
                                name: "price",
                                placeholder: "قیمت",
                                type: "number",
                            },
                            {
                                label: 'date',
                                required: true,
                                name: "date",
                                placeholder: "تاریخ",
                                type: "date",
                            },
                            {
                                label: 'select',
                                name: "select",
                                placeholder: "اتنخاب",
                                type: "select",
                                select_url: 'http://localhost:3001/users/select/'
                            }
                        ]
                    }
                />

                <TableBuilder
                    scrollable={true}
                    title={"مساعده ها"}
                    dataSource={[
                        {
                            key: '1',
                            first_name: 'یوسف',
                            last_name: "اصانلو",
                            national_code: "495450338",
                            date: "3/4/1403"
                        },
                        {
                            key: '2',
                            first_name: 'یوسف',
                            last_name: "اصانلو",
                            national_code: "495450338",
                            date: "3/3/1402"
                        },
                        {
                            key: '3',
                            first_name: 'یوسف',
                            last_name: "اصانلو",
                            national_code: "495450338",
                            date: "3/3/1402"
                        },
                        {
                            key: '4',
                            first_name: 'یوسف',
                            last_name: "اصانلو",
                            national_code: "495450338",
                            date: "3/3/1402"
                        },
                        {
                            key: '51',
                            first_name: 'یوسف',
                            last_name: "اصانلو",
                            national_code: "495450338",
                            date: "3/3/1402"
                        },
                        {
                            key: '6',
                            first_name: 'یوسف',
                            last_name: "اصانلو",
                            national_code: "495450338",
                            date: "3/3/1402"
                        },
                        {
                            key: '7',
                            first_name: 'یوسف',
                            last_name: "اصانلو",
                            national_code: "495450338",
                            date: "3/3/1402"
                        },
                        {
                            key: '8',
                            first_name: 'یوسف',
                            last_name: "اصانلو",
                            national_code: "495450338",
                            date: "3/3/1402"
                        }
                    ]}
                    columns={[
                        {
                            title: 'نام',
                            dataIndex: 'first_name',
                            key: 'first_name',
                        },
                        {
                            title: 'نام خانوادگی',
                            dataIndex: 'last_name',
                            key: 'last_name',
                        },
                        {
                            title: 'کد ملی',
                            dataIndex: 'national_code',
                            key: 'national_code',
                        },
                        {
                            title: 'تاریخ اخذ',
                            dataIndex: 'date',
                            key: 'date',
                        },
                        {
                            title: 'عملیات',
                            key: "actions",
                            dataIndex: "actions",
                        }
                    ]}

                />
            </div>

            <div>
                <WrapperData color={'red'} isMobile={false}>
                    item
                </WrapperData>
            </div>
        </>
    );
}