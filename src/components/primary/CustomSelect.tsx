import React, {useEffect, useState} from "react";
import {Select, Spin} from "antd";
import {SelectOption, SizeTypes} from "../../@types/app";
import {useApp} from "../../store/app.store";
import ApiService from "../../services/ApiService";
import FormInstance from "antd/lib/form";
import NoData from "../tiny/NoData";
import {appConfig} from "../../config/app.config";

interface CustomSelectProps {
    options?: SelectOption[],
    placeholder?: string,
    select_url?: string,
    value?: string,
    size?: SizeTypes,
    name?: string,
    form?: FormInstance,
    change?: (value: string) => string,
    mode?: '' | 'multiple' | 'tags',
    className?: string
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
        mode = '',
        className = ''
    }
) => {
    const {theme} = useApp();
    const [_options, setOptions] = useState<undefined | SelectOption[]>(options);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchMoreLoading, setFetchMoreLoading] = useState<boolean>(false);

    useEffect(() => {
        if (select_url) {
            search()
        } else if (options && !select_url) {
            setOptions(() => options);
        } else {
            // todo: notify user, that this component needs at least one of options || select_url.
            console.log("specify data. SELECT");
        }
    }, []);

    const search = (input: string = '', page: number = 1, scroll: boolean = false) => {
        if (!select_url) return;

        if (scroll) {
            setFetchMoreLoading(() => true);
        } else {
            setLoading(true);
            setOptions([]);
        }

        const url = `${select_url}?search=${input}&page=${page}`;

        return new Promise((resolve, reject) => {
            ApiService.get(url, {
                params: {
                    limit: appConfig.paginationLimit
                }
            })
                .then(({data}) => {
                    setNextPage(() => data.data.next);
                    setOptions((prevState) => [...prevState, ...data.data.items]);

                    return resolve(data);
                })
                .catch((error) => {
                    return reject(error);
                })
                .finally(() => {
                    if (scroll) {
                        setFetchMoreLoading(() => false);
                    } else {
                        setLoading(false);
                    }
                });
        })
    };

    const handlePopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (!select_url) return;

        const popupContainer = e.currentTarget;
        const isAtEndOfScroll = popupContainer.scrollTop + popupContainer.clientHeight === popupContainer.scrollHeight;

        if (isAtEndOfScroll && nextPage && !loading) {
            search('', nextPage, true);
        }
    }

    // filter options based on user input in client mode.
    const handleFilterOption = (input: string, option?: SelectOption) => {
        if (!option) return false;
        return !!option.children[2].includes(input.toLowerCase());
    }

    const handleSelectChange = (e) => {
        // handle tags mode, creating a tag here.
        // if (mode === 'tags' && !loading && !nextPage) {
        //     const lastEl = e[e?.length - 1];
        //     TagApiService.createOne({
        //         timelineId: params.timelineId,
        //         title: lastEl
        //     })
        //         .then(res => {
        //             search();
        //         })
        //         .catch(err => {
        //             console.log(lastEl, _options);
        //         })
        // }

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
            className={className}
        >
            {
                (_options?.length > 0) && _options?.map(el => (
                    <Select.Option
                        key={el.id}
                        value={el.id}
                    >
                        {el.icon ? <i className={el.icon}
                                      style={{marginRight: 0, color: theme.primaryColor}}></i> : null} {el.title}
                    </Select.Option>
                ))
            }
        </Select>
    );
}

export default CustomSelect;