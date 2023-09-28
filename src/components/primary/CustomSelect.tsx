import React, {useEffect, useState} from "react";
import {Select, Spin} from "antd";
import {SelectOption} from "../../@types/app";

interface CustomSelectProps {
    options?: SelectOption[],
    placeholder?: string,
    select_url?: string
}

const CustomSelect: React.FC<CustomSelectProps> = (
    {
        options,
        placeholder = "انتخاب کنید",
        select_url
    }
) => {
    const [_options, setOptions] = useState<undefined | SelectOption[]>(options);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (select_url) {
            search().then(() => {});
        } else if (options && !select_url) {
            setOptions(options);
        } else {
            // todo: notify user, that this component needs at least one of options || select_url.
            console.log("specify data. SELECT");
        }
    }, []);

    const search = async (input: string = '') => {
        setLoading(true);
        setOptions([]);
        if (nextPageUrl) {
            // todo: implement getting next page.
        } else {
            const res = await (await fetch(`${select_url}?search=${input}&page=1`)).json();
            const { data } = res;
            setOptions(data);
        }
    }

    // filter options based on user input in client mode.
    const handleFilterOption = (input: string, option?: SelectOption) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <Select
            options={_options}
            placeholder={placeholder}
            showSearch={true}
            filterOption={handleFilterOption}
            onSearch={search}
            notFoundContent={loading ? <Spin size="small" /> : null}
        >
        </Select>
    );
}

export default CustomSelect;