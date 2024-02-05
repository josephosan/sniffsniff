import React, { ReactNode } from 'react';
import { Space, Tag } from 'antd';

interface Tag {
    color?: string;
    closeIcon?: ReactNode;
    icon?: ReactNode;
    bordered?: boolean;
    onClose?: (e: any) => void;
    text?: string;
}

interface TagWrapperProps {
    tagList: Tag[];
}

const TagWrapper: React.FC<TagWrapperProps> = ({ tagList }) => {
    return (
        <Space>
            {tagList &&
                tagList.map((t) => {
                    return (
                        <Tag
                            onClose={t.onClose}
                            icon={t.icon}
                            bordered={t.bordered}
                            closeIcon={t.closeIcon}
                            className="d-flex justify-content-center align-items-center mt-1 mb-0"
                        >
                            <div className="p-1">{t.text}</div>
                        </Tag>
                    );
                })}
        </Space>
    );
};

export default TagWrapper;
