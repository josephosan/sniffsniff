import React from "react";
import {Table} from "antd";
import {appConfig} from "../../config/app.config";
import {useApp} from "../../store/app.store";
import {useMediaQuery} from "react-responsive";
import {SizeTypes} from "../../@types/app";

interface Column {
    title: string,
    dataIndex: string,
    key: string
}

export interface TableBuilderProps<T> {
    title?: string,
    rows?: number,
    columns: Column[],
    dataSource: T[]
    scrollable?: boolean,
    size?: SizeTypes
}

export const TableBuilder: React.FC<TableBuilderProps<never>> = (
    {
        title,
        rows,
        columns,
        dataSource,
        scrollable,
        size = 'middle'
    }
) => {
    const {theme} = useApp();
    const isMobile = useMediaQuery({query: `(max-width: ${appConfig.appBreakPoint}px)`});

    return (
        <div>
            {
                title && (
                    <h4 className={"mx-1 mb-4"} style={{color: theme.defaultTextColor}}>
                        {title}
                    </h4>
                )
            }

            <div>
                <Table
                    pagination={{position: ["bottomCenter"], pageSize: rows ? rows : (isMobile ? 12 : 6)}}
                    size={size}
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{x: scrollable ? 500 : 0}}
                />
            </div>
        </div>
    );
};
