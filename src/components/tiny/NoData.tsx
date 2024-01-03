import React from "react";

interface NoDataProps {
    direction?: 'end' | 'start' | 'center'
}

const NoData: React.FC<NoDataProps> = (
    {
        direction = 'center'
    }
) => {
    return (
        <div className={"w-100 h-100 p-2 d-flex align-items-center justify-content-" + direction}>
            داده ای موجود نیست.
        </div>
    );
}

export default NoData;