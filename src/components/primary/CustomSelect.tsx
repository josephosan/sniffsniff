import React, {useEffect, useState} from "react";
import {Select, Spin} from "antd";
import {SelectOption, SizeTypes} from "../../@types/app";
import {useApp} from "../../store/app.store";
import ApiService from "../../services/ApiService";
import FormInstance from "antd/lib/form";

interface CustomSelectProps {
    options?: SelectOption[],
    placeholder?: string,
    select_url?: string,
    value?: string,
    size?: SizeTypes,
    multiSelect?: boolean,
    name?: string,
    form?: FormInstance
}

const CustomSelect: React.FC<CustomSelectProps> = (
    {
        options,
        placeholder = "انتخاب کنید",
        select_url,
        value,
        size = 'large',
        multiSelect = false,
        name,
        form
    }
) => {
    const {theme} = useApp();
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

    const search = (input: string = '') => {
        if (!select_url) return;

        setLoading(true);
        setOptions([]);

        const url = `${select_url}?search=${input}&page=1`;

        ApiService.get(url)
            .then(({data}) => {
                return data;
            })
            .then((data) => {
                setNextPageUrl(data.next);
                setOptions(data.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handlePopupScroll = async (e: React.UIEvent<HTMLDivElement>) => {
        if (!select_url) return;

        const popupContainer = e.currentTarget;
        const isAtEndOfScroll = popupContainer.scrollTop + popupContainer.clientHeight === popupContainer.scrollHeight;

        if (isAtEndOfScroll && nextPageUrl && !loading) {
            try {
                const {data} = await (await ApiService.get(nextPageUrl));
                setNextPageUrl(data.next);
                setOptions((prevState) => {
                    return [...prevState, ...data.data];
                });
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
    }

    // filter options based on user input in client mode.
    const handleFilterOption = (input: string, option?: SelectOption) => {
        if (!option) return false;
        return !!option.children[2].includes(input.toLowerCase());
    }

    const handleSelectChange = (e) => {
        form.setFieldsValue({[name]: e});
    }

    return (
        <Select
            placeholder={placeholder ? placeholder : 'انتخاب کنید'}
            showSearch={true}
            filterOption={select_url ? undefined : handleFilterOption}
            onSearch={search}
            notFoundContent={loading ? <Spin size="small"/> : null}
            virtual={true}
            onPopupScroll={handlePopupScroll}
            onChange={handleSelectChange}
            value={value}
            optionFilterProp={'children'}
            size={size}
            mode={multiSelect ? 'multiple' : ''}
        >
            {
                _options?.map(el => (
                    <Select.Option
                        key={el.value}
                        value={el.value}
                    >
                        {el.icon ? <i className={el.icon}
                                      style={{marginRight: 0, color: theme.primaryColor}}></i> : null} {el.label}
                    </Select.Option>
                ))
            }
        </Select>
    );
}

export default CustomSelect;