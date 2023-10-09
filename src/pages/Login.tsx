import React from "react";
import {Divider, Form, Input, Button, Anchor} from "antd";
import {useApp} from "../store/app.store";
import { appConfig } from "../config/app.config";


const {Link} = Anchor;
const Login: React.FC = () => {
    const {theme} = useApp();
    

    return (
        <div className={"mx-3 d-flex flex-column justify-content-between align-items-center h-100"}
             style={{color: theme.fadeTextColor}}>
            <div className="mt-5">
                logo here
            </div>
            <div>
                <h3  style={{marginTop:'100px', marginBottom:'100px'}} >به اجوایونت خوش آمدید!</h3>
            </div>
            <div style={{width: "95%"}}>
                <Form >
                    <Form.Item className="mb-2" name="email">
                        <Input size="large" placeholder="ایمیل"/>
                    </Form.Item>
                    <Form.Item name="email">
                        <Anchor style={{textDecoration:'none'}} className="login-form-forgot" href="#" >
                        <Link  href="#" title="رمز عبور خود را فراموش کرده اید؟" />
                        </Anchor>
                    </Form.Item>
                    <Form.Item className="d-flex justify-content-center" name="button">
                        <Button className="px-5 mt-5" size="large" type="primary" htmlType="submit">
                            ورود
                        </Button>
                    </Form.Item>
                </Form>

            </div>

            <div style={{padding: '0 100px 28px 100px'}} className={"w-100"}>
                <Divider>یا</Divider>
            </div>
            <Button  className=" w-25 mb-4" size="large" type="primary" htmlType="submit">
          <i className="bi bi-google"></i>
         <span className="mx-2">
            ورود با گوگل
            </span>   
            </Button>

            <div className="mb-3">
                حساب کاربری ندارید؟ <span
                style={{
                    textDecoration: "underline",
                    paddingBottom: '3px',
                    textDecorationSkipInk: 'none',
                    textDecorationColor: theme.primaryColor,
                    cursor: 'pointer'
                }}
            >ایجاد</span>
            </div>
        </div>
    );
}

export default Login;