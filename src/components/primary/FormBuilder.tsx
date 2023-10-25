import React, {ReactNode, useEffect, useState} from "react";
import {Button, Col, Form, Input, Row} from "antd"
import {FlexTypes, FormBuilderField, SizeTypes} from "../../@types/app";
import CustomSelect from "./CustomSelect";
import {useApp} from "../../store/app.store";
import {appConfig} from "../../config/app.config";
import DatePicker, {DateObject} from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import transition from "react-element-popper/animations/transition"
import opacity from "react-element-popper/animations/opacity";

// theme
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/yellow.css"
import Loading from "../secondary/Loading";

interface FormBuilderProps {
    onFinish?: (data: never) => void,
    onFinishFailed?: () => void,
    fields: FormBuilderField[],
    submitButtonLabel?: string,
    size?: SizeTypes,
    submitButtonFlex?: FlexTypes,
    submitButtonClasses?: string,
    additionalElement?: ReactNode,
    colXS?: number,
    colSM?: number,
    colXL?: number,
    submitButtonLoading?: boolean,
    loading?: boolean
}

const FormBuilder: React.FC<FormBuilderProps> = (
    {
        onFinish,
        onFinishFailed,
        fields,
        submitButtonLabel = 'ارسال',
        size = 'middle',
        submitButtonFlex = 'start',
        submitButtonClasses,
        additionalElement,
        colXS = 24,
        colSM = 12,
        colXL = 8,
        submitButtonLoading = false,
        loading = false
    }
) => {
    const {theme} = useApp();
    const [form] = Form.useForm();
    const {errors, handleSetErrors} = useApp();
    const [_fields, setFields] = useState<FormBuilderField[] | null>(null);

    useEffect(() => {
        setFields(() => fields);
    }, [fields]);

    useEffect(() => {
        if (errors && errors.formErrors) {
            setFields(prevState => {
                return prevState?.map(el => {
                    return {
                        ...el,
                        errors: errors.formErrors[el.name]
                    }
                })
            })
        }
    }, [errors]);

    const handleClearElementErrors = () => {
        setFields(prevState => {
            return prevState?.map(el => {
                return {
                    ...el,
                    errors: null
                }
            });
        });
    }

    const convertToLatinDigits = (str) => {
        const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
        const latinDigits = '0123456789';

        for (let i = 0; i < 10; i++) {
            str = str.replace(new RegExp(persianDigits[i], 'g'), latinDigits[i]);
        }
        return str;
    };

    const handleSubmit = (data) => {
        handleSetErrors(null);
        handleClearElementErrors();

        Object.keys(data).forEach((key) => {
            if (data[key] instanceof DateObject) {
                data[key] = convertToLatinDigits(data[key].format());
                console.log(data[key])
            }
        })

        onFinish(data);
    }

    return (
        <>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 24}}
                initialValues={{remember: true}}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout={'vertical'}
                form={form}
                className={"position-relative"}
            >
                {
                    loading && (
                        <div
                            className={"d-flex justify-content-center align-items-center"}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 100,
                                backdropFilter: "blur(1px)"
                            }}
                        >
                            <div
                                className={"d-flex justify-content-center align-items-center"}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    zIndex: 101,
                                }}
                            >
                                <Loading/>
                            </div>
                        </div>
                    )
                }
                <Row gutter={16}>
                    {_fields && _fields.map((el, index) => (
                        <Col
                            xs={{span: colXS}}
                            sm={{span: colSM}}
                            xl={{span: colXL}}
                            key={index}
                        >
                            {
                                (el.type === 'password') ? (
                                    <Form.Item
                                        label={el.label}
                                        name={el.name}
                                        rules={el.rules}
                                        required={!!el.required}
                                        help={el.errors}
                                        initialValue={el.initialValue}
                                    >
                                        <Input.Password
                                            placeholder={el.placeholder}
                                            type={el.type}
                                            size={size}
                                        />
                                    </Form.Item>
                                ) : el.type === 'text' ? (
                                    <Form.Item
                                        label={el.label}
                                        name={el.name}
                                        rules={el.rules}
                                        required={!!el.required}
                                        help={el.errors}
                                        initialValue={el.initialValue}
                                    >
                                        <Input
                                            placeholder={el.placeholder}
                                            type={el.type}
                                            size={size}
                                        />
                                    </Form.Item>
                                ) : (el.type === 'date' || el.type === 'date_time') ? (
                                    <Form.Item
                                        label={el.label}
                                        name={el.name}
                                        rules={el.rules}
                                        required={!!el.required}
                                        help={el.errors}
                                        initialValue={el.initialValue}
                                    >
                                        <DatePicker
                                            className={"yellow " + (theme.mode === 'dark' ? "bg-dark" : "")}
                                            containerClassName={"w-100"}
                                            inputClass={"w-100"}
                                            placeholder={el.placeholder}
                                            locale={persian_fa}
                                            calendar={persian}
                                            plugins={[
                                                (el.type === 'date_time') ? <TimePicker position={"bottom"}/> : <></>
                                            ]}
                                            format={(el.type === 'date') ? 'YYYY/MM/DD' : 'YYYY/MM/DD HH:mm:ss'}
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
                                ) : (el.type === 'select' || el.type === 'multi_select') ? (
                                    <Form.Item
                                        label={el.label}
                                        name={el.name}
                                        rules={el.rules}
                                        required={!!el.required}
                                        help={el.errors}
                                        initialValue={el.initialValue}
                                    >
                                        <CustomSelect
                                            options={el.options}
                                            placeholder={el.placeholder}
                                            select_url={el.select_url}
                                            size={size}
                                            multiSelect={el.type === 'multi_select'}
                                            name={el.name}
                                            form={form}
                                        />
                                    </Form.Item>
                                ) : (
                                    <Form.Item
                                        label={el.label}
                                        name={el.name}
                                        rules={el.rules}
                                        required={!!el.required}
                                        help={el.errors}
                                        initialValue={el.initialValue}
                                    >
                                        <Input
                                            placeholder={el.placeholder}
                                            type={el.type}
                                            size={size}
                                        />
                                    </Form.Item>
                                )
                            }
                        </Col>
                    ))}
                </Row>


                {
                    additionalElement && (
                        <div className={"w-100 mt-3 mb-4 d-flexgit justify-content-center align-items-center"}>
                            {additionalElement}
                        </div>
                    )
                }

                <Col xs={{span: 24}} sm={{span: 24}} xl={{span: 24}}>
                    <Form.Item className={"d-flex align-items-center justify-content-" + submitButtonFlex}>
                        <Button
                            className={submitButtonClasses}
                            size={size}
                            type="primary"
                            htmlType="submit"
                            style={{
                                size: appConfig.defaultFontSize
                            }}
                            disabled={submitButtonLoading}
                        >
                            {
                                submitButtonLoading ? 'درحال ارسال ...' : submitButtonLabel
                            }
                        </Button>
                    </Form.Item>
                </Col>
            </Form>
        </>
    )
        ;
}

export default FormBuilder;