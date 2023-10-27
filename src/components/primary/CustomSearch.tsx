import React from "react";
import {Input} from "antd";
import {appConfig} from "../../config/app.config";
import {SizeTypes} from "../../@types/app";

const {Search} = Input;

interface CustomSearchProps {
    placeholder?: string,
    onSearch?: () => string,
    addBefore?: string,
    allowClear?: boolean,
    inputMode?: boolean,
    size?: SizeTypes,
    value?: string | boolean | number | null
}

const CustomSearch: React.FC<CustomSearchProps> = (
    {
        placeholder = 'جستجو ...',
        onSearch,
        addBefore,
        allowClear = true,
        inputMode = false,
        size = "middle",
        value,
    }
) => {
    return (
        <>
            {
                inputMode ? (
                        <Input
                            placeholder={placeholder}
                            prefix={<i style={{fontSize: appConfig.smallIconSize + "px"}} className={"bi bi-search"}></i>}
                            size={size}
                            value={value}
                            onChange={onSearch}
                        />
                    )
                    : (
                        <Search
                            rootClassName={"w-100"}
                            placeholder={placeholder}
                            onSearch={onSearch}
                            addBefore={addBefore}
                            allowClear={allowClear}
                            size={size}
                        >
                        </Search>
                    )
            }
        </>
    );
}

export default CustomSearch;