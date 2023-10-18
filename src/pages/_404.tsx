import React from "react";
import CustomImage from "../components/secondary/CustomImage";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

const _404: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ fontFamily: 'IRAN-sans' }} className={"w-100 h-100 d-flex justify-content-center align-items-center flex-column"}>
            <CustomImage
                src={"src/assets/global/_404.svg"}
                width={'80%'}
            />
            <Button className={"mt-5"} onClick={() => navigate('/home')}>
                بازگشت به خانه
            </Button>
        </div>
    );
}

export default _404;