import React, {ReactNode, useEffect, useState} from "react";
import {Button, Col, DatePicker, Form, Input, Row} from "antd"
import {FlexTypes, FormBuilderField, SizeTypes} from "../../@types/app";
import locale from "antd/es/date-picker/locale/fa_IR";
import CustomSelect from "./CustomSelect";
import {useApp} from "../../store/app.store";
import {appConfig} from "../../config/app.config";

interface FormBuilderProps {
    onFinish?: () => void,
    onFinishFailed?: () => void,
    fields: FormBuilderField[],
    submitButtonLabel?: string,
    size?: SizeTypes,
    submitButtonFlex?: FlexTypes,
    submitButtonClasses?: string,
    additionalElement?: ReactNode,
    colXLSpan?: number,
    colSMSpan?: number,
    colXSSpan?: number
}

const FormBuilder: React.FC<FormBuilderProps> = (
    {
        onFinish,
        onFinishFailed,
        fields,
        submitButtonLabel = 'ارسال',
        size = 'large',
        submitButtonFlex = 'start',
        submitButtonClasses,
        additionalElement,
        colXLSpan= 8,
        colSMSpan= 12,
        colXSSpan= 24,
    }
) => {
    const {errors, handleSetErrors} = useApp();
    const [_fields, setFields] = useState<FormBuilderField[] | null>(null)

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

    const handleSubmit = () => {
        handleSetErrors(null);
        handleClearElementErrors();
        onFinish();
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
            >
                <Row gutter={16}>
                    {_fields && _fields.map((el, index) => (
                        <Col
                            xs={{span: colXSSpan}}
                            sm={{span: colSMSpan}}
                            xl={{span: colXLSpan}}
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
                                    >
                                        <Input
                                            placeholder={el.placeholder}
                                            type={el.type}
                                            size={size}
                                        />
                                    </Form.Item>
                                ) : el.type === 'date' ? (
                                    <Form.Item
                                        label={el.label}
                                        name={el.name}
                                        rules={el.rules}
                                        required={!!el.required}
                                        help={el.errors}
                                    >
                                        <DatePicker
                                            className={"w-100"}
                                            locale={locale}
                                            placeholder={el.placeholder}
                                            size={size}
                                        />
                                    </Form.Item>
                                ) : el.type === 'select' ? (
                                    <Form.Item
                                        label={el.label}
                                        name={el.name}
                                        rules={el.rules}
                                        required={!!el.required}
                                        help={el.errors}
                                    >
                                        <CustomSelect
                                            options={el.options}
                                            placeholder={el.placeholder}
                                            select_url={el.select_url}
                                            size={size}
                                        />
                                    </Form.Item>
                                ) : (
                                    <Form.Item
                                        label={el.label}
                                        name={el.name}
                                        rules={el.rules}
                                        required={!!el.required}
                                        help={el.errors}
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
                        <div className={"w-100 mt-3 mb-4 d-flex justify-content-center align-items-center"}>
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
                        >
                            {submitButtonLabel}
                        </Button>
                    </Form.Item>
                </Col>
            </Form>
        </>
    );
}

export default FormBuilder;