import React, {ReactNode, useEffect, useState} from "react";
import {Button, Col, DatePicker, Form, Input, Row} from "antd"
import {FlexTypes, FormBuilderField, SizeTypes} from "../../@types/app";
import locale from "antd/es/date-picker/locale/fa_IR";
import CustomSelect from "./CustomSelect";
import {useApp} from "../../store/app.store";
import {appConfig} from "../../config/app.config";
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
    submitButtonLoading?: boolean
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
        submitButtonLoading = false
    }
) => {
    const [form] = Form.useForm();
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

    const handleSubmit = (data) => {
        handleSetErrors(null);
        handleClearElementErrors();
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
            >
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
                                ) : (el.type === 'select' || el.type === 'multi_select') ? (
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
    );
}

export default FormBuilder;