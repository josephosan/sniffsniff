import React, {useEffect, useState} from "react";
import {ColorPicker} from "antd";
import CustomSelect from "./CustomSelect";
import {useApp} from "../../store/app.store";

type SortTypes = 'start_date' | 'end_date' | 'name' | 'explanation';

interface FiltersOptions {
    filterChanged: () => never
}
const Filters: React.FC<FiltersOptions> = (
    {
        filterChanged
    }
) => {
    const { theme } = useApp();

    const [order, setOrder] = useState<'ASC' | 'DES' | null>(null);
    const [color, setColor] = useState<string | null>(theme.primaryColor);
    const [sortType, setSortType] = useState<SortTypes | null>(null);
    const [dataType, setDataType] = useState<string | null>(null);

    useEffect(() => {
        if (filterChanged) {
            filterChanged({
                order,
                color: (color === theme.primaryColor) ? null : color,
                sortType,
                dataType
            });
        }
    }, [
        order,
        color,
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
            <ColorPicker
                showText={() => <span>رنگ </span>}
                size={'middle'}
                allowClear={true}
                format={'hex'}
                defaultFormat={'hex'}
                disabledAlpha={true}
                value={color}
                onChange={({hex}) => setColor(() => hex)}
            />
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