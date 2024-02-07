import React, { ReactNode, useState } from 'react';
import { Space, Tag, Input } from 'antd';

interface TagItem {
    text: string;
}

interface TagWrapperProps {
    tagList: TagItem[];
    onChange: (tagList: TagItem[]) => void;
    removable?: boolean;
    addable?: boolean;
    bordered?: boolean;
    style?: object;
}

const TagWrapper: React.FC<TagWrapperProps> = React.memo(
    ({
        tagList,
        onChange,
        removable = false,
        addable = true,
        bordered = true,
        style,
    }) => {
        const [inputValue, setInputValue] = useState('');

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
        };

        const handleInputConfirm = () => {
            if (inputValue.trim() !== '') {
                const newTags = [...tagList, { text: inputValue.trim() }];
                onChange(newTags);
                setInputValue('');
            }
        };

        const handleRemoveTag = (removedTag: TagItem) => {
            const newTags = tagList.filter(
                (tag) => tag.text !== removedTag.text,
            );
            onChange(newTags);
        };

        return (
            <Space
                className=" d-flex"
                style={{
                    flexWrap: 'wrap',
                }}
            >
                {tagList &&
                    tagList.map((tag, index) => {
                        return (
                            <Tag
                                style={style}
                                bordered={bordered}
                                key={index}
                                closable={removable}
                                onClose={() => handleRemoveTag(tag)}
                                className="d-flex justify-content-center align-items-center "
                            >
                                <div
                                    className="p-1 "
                                    style={{ color: 'white' }}
                                >
                                    {tag.text}
                                </div>
                            </Tag>
                        );
                    })}

                {addable && (
                    <Input
                        style={{ width: '120px' }}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                        placeholder="تگ جدید"
                        prefix={<i className="bi bi-plus"></i>}
                    />
                )}
            </Space>
        );
    },
);

export default TagWrapper;
