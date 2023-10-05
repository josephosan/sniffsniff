import React from "react";
import ApiService from "../services/ApiService";
import {Button} from "antd";

export const Home: React.FC = () => {
    const handleMessageClick = () => {
        ApiService.patch();
    }

    return (
        <>
            <div>
                <Button onClick={handleMessageClick}>click me</Button>
            </div>
        </>
    );
}