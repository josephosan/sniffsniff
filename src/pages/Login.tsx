import React from "react";
import {Divider,Form,Input,Button,Anchor} from "antd";
import { GoogleOutlined } from '@ant-design/icons';
import {useApp} from "../store/app.store";

 
const { Link } = Anchor;
const Login: React.FC = () => {
    const { theme } = useApp();

    return (
        <div className={"mx-3 d-flex flex-column justify-content-between align-items-center h-100"} style={{ color: theme.fadeTextColor }}>
            <div className="mb-5">
                logo here
            </div>
            <div>
                <h3 className="mt-5">به اجوایونت خوش آمدید!</h3>
            </div>
            <div style={{width:"100%"}} >
               <Form  size="large"  >
                <Form.Item className="mb-0" name="email" >
                   <Input  size="large"  placeholder="ایمیل" />
                </Form.Item>
                <Form.Item   name="email" >
                <Anchor className="login-form-forgot" href="#">
                <Link href="#" title="رمز عبور خود را فراموش کرده اید؟" /> 
                
               </Anchor>
                </Form.Item>
                <Form.Item className="d-flex justify-content-center " name="button" >
                <Button className="px-5 mt-5" size="large" type="primary" htmlType="submit">
                ورود
                </Button>
                </Form.Item>
               </Form>
              
            </div>
           
            <div style={{padding: '0 100px 0 100px'}} className={"w-100"}>
                <Divider>یا</Divider>
            </div>
            <Button style={{backgroundColor:"#E5E7E9"}} className="w-25" size="large" type="primary" htmlType="submit">
            <GoogleOutlined />
                ورود با گوگل
                </Button>
            
            <div>
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