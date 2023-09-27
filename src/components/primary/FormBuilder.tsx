import React from "react";
import {Button, Col, Form, Input, Row} from "antd"
import {FormBuilderField} from "../../@types/app";
import {DatePicker as DatePickerJalali} from "antd-jalali";
import locale from "antd/es/date-picker/locale/fa_IR";
import 'moment/locale/fa.js';


interface FormBuilderProps {
    onFinish?: () => void,
    onFinishFailed?: () => void,
    fields: FormBuilderField[],
    submitButtonLabel?: string,
}

const FormBuilder: React.FC<FormBuilderProps> = (
    {
        onFinish,
        onFinishFailed,
        fields,
        submitButtonLabel = 'ارسال',
    }
) => {


    return (
        <>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 24}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row gutter={16}>
                    {fields.map((el, index) => (
                        <Col
                            xs={{span: 24}}
                            sm={{span: 12}}
                            xl={{span: 8}}
                            key={index}
                        >
                            {
                                (el.type === 'password') ? (
                                    <Form.Item
                                        label={el.label}
                                        name={el.name}
                                        rules={el.rules}
                                    >
                                        <Input.Password
                                            placeholder={el.placeholder}
                                            type={el.type}
                                        />
                                    </Form.Item>
                                ) : el.type === 'text' ? (
                                    <Form.Item
                                        label={el.label}
                                        name={el.name}
                                        rules={el.rules}
                                    >
                                        <Input
                                            placeholder={el.placeholder}
                                            type={el.type}
                                        />
                                    </Form.Item>
                                ) : el.type === 'date' ? (
                                    <Form.Item
                                        label={el.label}
                                        name={el.name}
                                        rules={el.rules}
                                    >
                                        <DatePickerJalali
                                            className={"w-100"}
                                            locale={locale}
                                            placeholder={el.placeholder}
                                        />
                                    </Form.Item>
                                ) : (
                                    <Form.Item
                                        label={el.label}
                                        name={el.name}
                                        rules={el.rules}
                                    >
                                        <Input
                                            placeholder={el.placeholder}
                                            type={el.type}
                                        />
                                    </Form.Item>
                                )
                            }
                        </Col>
                    ))}
                </Row>


                <Col xs={{span: 24}} sm={{span: 24}} xl={{span: 24}}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {submitButtonLabel}
                        </Button>
                    </Form.Item>
                </Col>
            </Form>
        </>
    );
}

export default FormBuilder;