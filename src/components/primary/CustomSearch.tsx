import React, {useState} from "react";
import {Input} from "antd";
import {appConfig} from "../../config/app.config";
import {SizeTypes} from "../../@types/app";
import {debounce} from "lodash";

const {Search} = Input;

interface CustomSearchProps {
    placeholder?: string,
    onSearch?: () => string,
    addBefore?: string,
    allowClear?: boolean,
    inputMode?: boolean,
    size?: SizeTypes,
    value?: string | boolean | number | null,
    asyncSearch?: boolean
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
        asyncSearch = false
    }
) => {
    const debounceSearch = debounce(function (query) {
        onSearch(query);
    }, 500)

    const handleChange = (data) => {
        if (asyncSearch && onSearch) {
            debounceSearch(data);
        } else if (!asyncSearch && onSearch) {
            onSearch(data);
        }
    }

    return (
        <>
            {
                inputMode ? (
                        <Input
                            placeholder={placeholder}
                            prefix={<i style={{fontSize: appConfig.smallIconSize + "px"}} className={"bi bi-search"}></i>}
                            size={size}
                            value={value}
                            onChange={handleChange}
                        />
                    )
                    : (
                        <Search
                            rootClassName={"w-100"}
                            placeholder={placeholder}
                            onSearch={handleChange}
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