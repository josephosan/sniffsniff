import React from "react";
import FormBuilder from "../components/primary/FormBuilder";
import ApiService from "../services/ApiService";

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
            </div>
        </>
    );
}