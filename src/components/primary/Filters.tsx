import React, {useEffect, useState} from "react";
import CustomSelect from "./CustomSelect";

type SortTypes = 'start_date' | 'end_date' | 'name' | 'explanation';

interface FiltersOptions {
    filterChanged: () => never
}
const Filters: React.FC<FiltersOptions> = (
    {
        filterChanged
    }
) => {
    const [order, setOrder] = useState<'ASC' | 'DES' | null>(null);
    const [sortType, setSortType] = useState<SortTypes | null>(null);
    const [dataType, setDataType] = useState<string | null>(null);

    useEffect(() => {
        if (filterChanged) {
            filterChanged({
                order,
                sortType,
                dataType
            });
        }
    }, [
        order,
        sortType,
        dataType
    ])

    const selectChooseOptions = [
        {label: 'تاریخ شروع', value: 'start_date'},
        {label: 'تاریخ پایان', value: 'end_date'},
        {label: 'نام', value: 'name'},
        {label: 'توضیح', value: 'explanation'}
    ]
    const selectOrderOptions = [
        {label: 'از بالا به پایین', value: 'ASC'},
        {label: 'از پایین به بالا', value: 'DES'},
    ];
    const selectTypeOptions = [
        {label: 'خصوصی', value: 'PRIVATE'},
        {label: 'گروه', value: 'GROUP'},
    ]

    return (
        <div className="d-flex flex-column h-25 justify-content-between mt-5">
            <CustomSelect
                options={selectChooseOptions}
                placeholder="بر اساس نوع"
                size={"middle"}
                value={sortType}
                change={(value) => setSortType(() => value)}
            />
            <CustomSelect
                options={selectTypeOptions}
                placeholder="تایپ نظم"
                size={"middle"}
                value={dataType}
                change={(value) => setDataType(() => value)}
            />
            <CustomSelect
                options={selectOrderOptions}
                placeholder="اردر"
                size={"middle"}
                value={order}
                change={(value) => setOrder(() => value)}
            />
        </div>
    );
}

export default Filters;