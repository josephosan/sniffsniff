import React from "react";
import {Divider} from "antd";
import {useApp} from "../store/app.store";

const Login: React.FC = () => {
    const { theme } = useApp();

    return (
        <div className={"d-flex flex-column justify-content-between align-items-center h-100"} style={{ color: theme.fadeTextColor }}>
            <div>
                logo here
            </div>
            <div>
                <h3>به اجوایونت خوش آمدید!</h3>
            </div>
            <div>
                {/*todo: implement form using antd form.*/}
            </div>
            <div style={{padding: '0 100px 0 100px'}} className={"w-100"}>
                <Divider>یا</Divider>
            </div>
            <div>
                {/*todo implement the google button styles using antd Button component. style it here using styled-component library. */}
            </div>
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