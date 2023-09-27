import React from "react";
import FormBuilder from "../components/primary/FormBuilder";

export const Home: React.FC = () => {
    return (
        <>
            <div>
                <FormBuilder
                    fields={
                        [
                            {
                                name: "name",
                                placeholder: "نام",
                                type: "text"
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
                                name: "date",
                                placeholder: "تاریخ",
                                type: "date",
                            }
                        ]
                    }
                />
            </div>
        </>
    );
}