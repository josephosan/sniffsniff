import React, {ReactNode, useEffect, useState} from "react";
import {Button, Col, Form, Row} from "antd"
import {FlexTypes, FormBuilderField, SizeTypes} from "../../@types/app";
import {useApp} from "../../store/app.store";
import {appConfig} from "../../config/app.config";
import {DateObject} from "react-multi-date-picker";

// theme
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/yellow.css"
import Loading from "../secondary/Loading";
import FieldComponent from "./FieldComponent";
import {hsvToHex} from "../../helpers/app.helper";

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
    loading?: boolean,
    initialValues?: never,
    showSubmitButton?: boolean,
    additionalFields?: never,
    valuesChange?: (data: never) => never
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
        loading = false,
        initialValues,
        showSubmitButton = true,
        additionalFields,
        valuesChange
    }
) => {
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

        if (data['color']) data['color'] = hsvToHex(data['color']['metaColor']['originalInput']);

        // for changing every date with Persian digits
        Object.keys(data).forEach((key) => {
            if (data[key] instanceof DateObject) {
                data[key] = convertToLatinDigits(data[key].format());
            }
        });

        onFinish(data);
    }

    const handleValuesChange = (data) => {
        if (valuesChange) {
            // for changing every date with Persian digits
            Object.keys(data).forEach((key) => {
                if (data[key] instanceof DateObject) {
                    data[key] = convertToLatinDigits(data[key].format());
                }
            });
            valuesChange(data);
        }
    }

    return (
        <>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 24}}
                initialValues={{remember: true, ...initialValues}}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout={'vertical'}
                form={form}
                className={"position-relative"}
                onValuesChange={handleValuesChange}
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
                            <FieldComponent
                                label={el.label}
                                name={el.name}
                                rules={el.rules}
                                required={!!el.required}
                                help={el.errors}
                                initialValue={el.initialValue}
                                type={el.type}
                                select_url={el.select_url}
                                options={el.options}
                                placeholder={el.placeholder}
                                size={size}
                                form={form}
                                minDate={el.minDate}
                                maxDate={el.maxDate}
                                colorPresets={el.colorPresets}
                                checked={el.checked}
                                defaultChecked={el.defaultChecked}
                            />

                            {
                                additionalFields
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

                {
                    showSubmitButton && (
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
                    )
                }
            </Form>
        </>
    )
        ;
}

export default FormBuilder;