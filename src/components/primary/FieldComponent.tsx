import React from "react";
import {Checkbox, ColorPicker, Form, Input} from "antd";
import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import opacity from "react-element-popper/animations/opacity";
import transition from "react-element-popper/animations/transition";
import {appConfig} from "../../config/app.config";
import CustomSelect from "./CustomSelect";
import {FormBuilderField} from "../../@types/app";
import {useApp} from "../../store/app.store";
import "../../styles/components/secondary/date-picker-color.scss";
import "../../styles/components/secondary/date-picker-background.scss";

const FieldComponent: React.FC<FormBuilderField> = (
    {
        label,
        name,
        rules,
        errors,
        initialValue,
        required,
        placeholder,
        type,
        size,
        form,
        options,
        select_url,
        rows,
        maxLength,
        no_resize,
        minDate,
        maxDate,
        colorPresets,
        tag_create_url,
        onChange,
    }
) => {
    const {theme} = useApp();

    return (
        <>
            {
                (type === 'checkbox') ? (
                    <Form.Item
                        label={label}
                        name={name}
                        rules={rules}
                        required={!!required}
                        help={errors}
                        valuePropName={"checked"}
                    >
                        <Checkbox
                            defaultChecked={initialValue}
                        >{ placeholder }</Checkbox>
                    </Form.Item>
                ) : (type === 'password') ? (
                    <Form.Item
                        label={label}
                        name={name}
                        rules={rules}
                        required={!!required}
                        help={errors}
                        initialValue={initialValue}
                    >
                        <Input.Password
                            placeholder={placeholder}
                            type={type}
                            size={size}
                        />
                    </Form.Item>
                ) : (type === 'text') ? (
                    <Form.Item
                        label={label}
                        name={name}
                        rules={rules}
                        required={!!required}
                        help={errors}
                        initialValue={initialValue}
                    >
                        <Input
                            placeholder={placeholder}
                            type={type}
                            size={size}
                        />
                    </Form.Item>
                ) : (type === 'textarea') ? (
                    <Form.Item
                        label={label}
                        name={name}
                        rules={rules}
                        required={!!required}
                        help={errors}
                        initialValue={initialValue}
                    >
                        <Input.TextArea
                            placeholder={placeholder}
                            type={type}
                            size={size}
                            rows={rows}
                            maxLength={maxLength}
                            style={{resize: no_resize ? 'none' : ''}}
                        />
                    </Form.Item>
                ) : (type === 'date' || type === 'date_time') ? (
                    <Form.Item
                        label={label}
                        name={name}
                        rules={rules}
                        required={!!required}
                        help={errors}
                        initialValue={initialValue}
                    >
                        <DatePicker
                            className={"theme-date-picker " + (theme.mode === 'dark' ? "theme-date-picker-dark" : "")}
                            containerClassName={"w-100"}
                            inputClass={"w-100"}
                            placeholder={placeholder}
                            locale={persian_fa}
                            calendar={persian}
                            autoFocus={false}
                            minDate={minDate}
                            maxDate={maxDate}
                            plugins={[
                                (type === 'date_time') ? <TimePicker position={"bottom"}/> : <></>
                            ]}
                            format={(type === 'date') ? 'YYYY/MM/DD' : 'YYYY/MM/DD HH:mm:ss'}
                            animations={[
                                opacity(),
                                transition({
                                    from: 40,
                                    transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                                }),
                            ]}
                            style={{
                                color: theme.fadeTextColor,
                                backgroundColor: theme.cardBg,
                                borderRadius: appConfig.defaultBorderRadius,
                                border: `1px solid ${theme.primaryColor}`,
                                padding: (size === "large" ? '10px' : ((size === "middle") ? '4px 11px 4px 11px' : '6px')),
                                marginTop: '1.2px',
                                outline: 'none',
                            }}
                            calendarPosition={"bottom-left"}
                        />
                    </Form.Item>
                ) : (type === 'select' || type === 'multi_select' || type === 'tags') ? (
                    <Form.Item
                        label={label}
                        name={name}
                        rules={rules}
                        required={!!required}
                        help={errors}
                    >
                        <CustomSelect
                            options={options}
                            placeholder={placeholder}
                            select_url={select_url}
                            size={size}
                            name={name}
                            form={form}
                            mode={
                                (type === 'multi_select') ? 'multiple' : ((type === 'tags') ? 'tags' : '')
                            }
                            tag_create_url={tag_create_url}
                            change={onChange}
                            value={initialValue}
                        />
                    </Form.Item>
                ) : (type === 'color') ? (
                    <Form.Item
                        label={label}
                        name={name}
                        rules={rules}
                        required={!!required}
                        help={errors}
                        initialValue={initialValue}
                    >
                        <ColorPicker
                            size={size}
                            format={"hex"}
                            defaultFormat={"hex"}
                            trigger={"click"}
                            disabledAlpha={true}
                            allowClear={false}
                            presets={colorPresets}
                        />
                    </Form.Item>
                ) : (
                    <Form.Item
                        label={label}
                        name={name}
                        rules={rules}
                        required={!!required}
                        help={errors}
                        initialValue={initialValue}
                    >
                        <Input
                            placeholder={placeholder}
                            type={type}
                            size={size}
                        />
                    </Form.Item>
                )
            }
        </>
    )
}

export default FieldComponent;