import React, {useState} from "react";
import {useApp} from "../../store/app.store";
import FormBuilder from "./FormBuilder";
import {FormBuilderField} from "../../@types/app";
import {Button} from "antd";


interface FiltersOptions {
}

const Filters: React.FC<FiltersOptions> = React.memo(() => {
    const {handleSetFilters, filters} = useApp();
    const [key, setKey] = useState<number>(0);
    const filterFormFields: FormBuilderField = [
        {
            type: 'date_time',
            name: 'startDateMin',
            required: false,
            placeholder: 'تاریخ شروع',
        },
        {
            type: 'date_time',
            name: 'endDateMax',
            required: false,
            placeholder: 'تاریخ پایان',
        },
    ];

    const handleValuesChange = (data) => {
        const newFilters = {
            ...filters,
            ...data
        }
        handleSetFilters(newFilters);
    }

    const handleClearClick = () => {
        setKey((key) => key+1);
        handleSetFilters(null);
    }

    return (
        <div className="d-flex flex-column gap-2 mt-5">
            <FormBuilder
                key={key}
                fields={filterFormFields}
                colXS={24}
                colSM={24}
                colXL={24}
                showSubmitButton={false}
                valuesChange={handleValuesChange}
            />
            <Button type={"primary"} size={"small"} onClick={handleClearClick}>پاک کردن</Button>
        </div>
    );
});

export default Filters;