import React from "react";
import {Button, Col, Form, Input, Row} from "antd"
import {FormBuilderField} from "../../@types/app";

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
                wrapperCol={{span: 16}}
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
                            <Form.Item
                                name={el.name}
                            >
                                <Input
                                    placeholder={el.placeholder}
                                    type={el.type}
                                />
                            </Form.Item>
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