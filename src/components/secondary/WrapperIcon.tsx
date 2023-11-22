import React from "react";
import { Space } from "antd";

interface WrapperIconprops{
    array: Array<{
        icon: string; event(): any;
      }>;

}

const WrapperIcon: React.FC<WrapperIconprops> = ({ array }) => {
    return (
        <>
            <Space>
            {array.map((item) => (
                    <i class={item.icon} onClick={item.event}></i>
      ))}</Space>
        </>
    )
}
export default WrapperIcon;