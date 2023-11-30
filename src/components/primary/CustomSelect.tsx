import React, {useEffect, useState} from "react";
import {Button, Select, Spin} from "antd";
import {SelectOption, SizeTypes} from "../../@types/app";
import {useApp} from "../../store/app.store";
import ApiService from "../../services/ApiService";
import FormInstance from "antd/lib/form";
import NoData from "../tiny/NoData";
import {appConfig} from "../../config/app.config";
import {debounce} from "lodash";

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
    className?: string,
    tag_create_url?: string
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
        className = '',
        tag_create_url
    }
) => {
    const {theme} = useApp();
    const [_options, setOptions] = useState<undefined | SelectOption[]>(options);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchMoreLoading, setFetchMoreLoading] = useState<boolean>(false);
    const [addTagLoading, setAddTagLoading] = useState<boolean>(false);
    const [cTagReady, setCTagReady] = useState<boolean | string>(false);

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
        if (mode === 'tags') setCTagReady(() => false);

        if (scroll) {
            setFetchMoreLoading(() => true);
        } else {
            setLoading(() => true);
            setOptions(() => []);
        }

        const params = {
            limit: appConfig.paginationLimit,
            page,
        }
        if (input !== '') params['s'] = input;

        ApiService.get(select_url, {
            params
        })
            .then(({data}) => {
                setNextPage(() => data.data.next);
                if (scroll) setOptions((prevState) => [...prevState, ...data.data.items]);
                else setOptions(() => data.data.items);

                if (data.data.items.length === 0 && mode === 'tags') setCTagReady(() => input);

            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                if (scroll) {
                    setFetchMoreLoading(() => false);
                } else {
                    setLoading(false);
                }
            });
    };

    const handlePopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (!select_url) return;

        const popupContainer = e.currentTarget;
        const isAtEndOfScroll = popupContainer.scrollTop + popupContainer.clientHeight === popupContainer.scrollHeight;

        if (isAtEndOfScroll && nextPage && !loading && !fetchMoreLoading && _options?.length > 0) {
            search('', nextPage, true);
        }
    }

    // filter options based on user input in client mode.
    const handleFilterOption = (input: string, option?: SelectOption) => {
        if (!option) return false;
        return !!option.children[2].includes(input.toLowerCase());
    }

    const handleSelectChange = (e) => {
        if (form) {
            form.setFieldsValue({[name]: e});
        } else if (change) {
            change(e);
        }
    }

    const handleAddTagClick = () => {
        if (!tag_create_url) throw new Error("To create a tag, please provide tag_create_url!");
        setAddTagLoading(() => true);
        ApiService.post(tag_create_url, {
            title: cTagReady
        })
            .then(({data}) => {
                // haha done
                setCTagReady(() => false);
                setOptions(() => [data.data]);
            })
            .catch(err => {
                // remove the added element
            })
            .finally(() => setAddTagLoading(() => false));
    }

    const handleKeyDown = (e) => {
        // handle enter with keycode 13
        if (e.code === "Enter" && cTagReady) handleAddTagClick();
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
            onKeyDown={handleKeyDown}
            suffixIcon={
                cTagReady ? (
                        <>
                            {
                                addTagLoading ? (
                                    <Spin size={"small"}/>
                                ) : (
                                    <Button
                                        size={"small"}
                                        type={"primary"}
                                        onClick={handleAddTagClick}
                                        style={{
                                            zIndex: 9999
                                        }}
                                    >
                                        افزودن تگ
                                    </Button>
                                )
                            }
                        </>
                    )
                    : undefined
            }
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