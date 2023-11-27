import React, {useEffect, useState} from "react";
import {Select, Spin} from "antd";
import {SelectOption, SizeTypes} from "../../@types/app";
import {useApp} from "../../store/app.store";
import ApiService from "../../services/ApiService";
import FormInstance from "antd/lib/form";
import NoData from "../tiny/NoData";
import TagApiService from "../../services/TagApiService";
import {useParams} from "react-router-dom";

interface CustomSelectProps {
    options?: SelectOption[],
    placeholder?: string,
    select_url?: string,
    value?: string,
    size?: SizeTypes,
    name?: string,
    form?: FormInstance,
    change?: (value: string) => string,
    mode?: '' | 'multiple' | 'tags'
}

const CustomSelect: React.FC<CustomSelectProps> = (
    {
        options = [],
        placeholder = "انتخاب کنید",
        select_url,
        value,
        size = 'large',
        name,
        form,
        change,
        mode = ''
    }
) => {
    const {theme} = useApp();
    const [_options, setOptions] = useState<undefined | SelectOption[]>(options);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const params = useParams();

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
                setNextPageUrl(data.data.next);
                setOptions(data.data.items);
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
                setNextPageUrl(data.data.next);
                setOptions((prevState) => {
                    return [...prevState, ...data.data.items];
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
        // handle tags mode, creating a tag here.
        if (mode === 'custom_tags' && !loading && !nextPageUrl) {
            const lastEl = e[e?.length - 1];
            TagApiService.createOne({
                timelineId: params.timelineId,
                title: lastEl
            })
                .then(res => {
                    search();
                })
                .catch(err => {
                    console.log(lastEl, _options);
                })
        }

        if (form) {
            form.setFieldsValue({[name]: e});
        } else if (change) {
            change(e);
        }
    }

    return (
        <Select
            placeholder={placeholder ? placeholder : 'انتخاب کنید'}
            showSearch={true}
            filterOption={select_url ? undefined : handleFilterOption}
            onSearch={search}
            notFoundContent={loading ? <Spin size="small"/> : <NoData direction={"start"}/>}
            virtual={true}
            onPopupScroll={handlePopupScroll}
            onChange={handleSelectChange}
            value={value}
            optionFilterProp={'children'}
            size={size}
            mode={(mode === 'tags' || mode === 'multiple') ? 'multiple' : ''}
        >
            {
                (_options?.length > 0) && _options?.map(el => (
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