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
            search()
        } else if (options && !select_url) {
            setOptions(options);
        } else {
            // todo: notify user, that this component needs at least one of options || select_url.
            console.log("specify data. SELECT");
        }
    }, []);

    const search = async (input: string = '') => {
        if (!select_url) return;

        setLoading(true);
        setOptions(() => []);

        const url = `${select_url}?search=${input}&page=1`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                return new Error(`Network response was not ok (${response.status})`);
            }
            const data = await response.json();
            setNextPageUrl(data.next);
            setOptions(prevOptions => [...prevOptions, ...data.data]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePopupScroll = async (e: React.UIEvent<HTMLDivElement>) => {
        if (!select_url) return;

        const popupContainer = e.currentTarget;
        const isAtEndOfScroll = popupContainer.scrollTop + popupContainer.clientHeight === popupContainer.scrollHeight;

        if (isAtEndOfScroll && nextPageUrl && !loading) {
            try {
                const res = await (await fetch(nextPageUrl)).json();
                setNextPageUrl(res.next);
                const {data} = res;
                setOptions((prevState) => {
                    return [...prevState, ...data];
                });
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
    }

    // filter options based on user input in client mode.
    const handleFilterOption = (input: string, option?: SelectOption) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <Select
            options={_options}
            placeholder={placeholder}
            showSearch={true}
            filterOption={select_url ? undefined : handleFilterOption}
            onSearch={search}
            notFoundContent={loading ? <Spin size="small"/> : null}
            virtual={true}
            onPopupScroll={handlePopupScroll}
        >
        </Select>
    );
}

export default CustomSelect;