import React from "react";
import {Skeleton, Space} from "antd";
import {ShapeSizeTypes} from "../../@types/app";

interface BigBoxSkeletonLoadingProps {
    size?: ShapeSizeTypes,
    active?: boolean,
    count?: number
}

const BigBoxSkeletonLoading: React.FC<BigBoxSkeletonLoadingProps> = (
    {
        size = 'large',
        active = true,
        count = 1
    }
) => {
    const skeletonArray = Array.from({length: count}, (_, index) => index)

    return (
        <div className={"w-100 row"}>
            {
                skeletonArray.map(el => {
                    return (
                        <Skeleton.Input
                            className={"col-sm w-100 m-2"}
                            key={el}
                            active={active}
                            size={size}
                            style={{
                                height: '300px'
                            }}
                        />
                    )
                })
            }
        </div>
    );
}

export default BigBoxSkeletonLoading;