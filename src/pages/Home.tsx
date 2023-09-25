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
                                name: "test",
                                placeholder: "label",
                                type: "text"
                            },
                            {
                                name: "test",
                                placeholder: "label",
                                type: "text"
                            },
                        ]
                    }
                />
            </div>
        </>
    );
}