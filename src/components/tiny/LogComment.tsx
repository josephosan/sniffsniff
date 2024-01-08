import React, { useState } from 'react';
import { Input, Button } from 'antd';

const { TextArea } = Input;

interface LogCommentProps {
    onSubmit: (value: string | null) => void;
}

const LogComment: React.FC<LogCommentProps> = ({ onSubmit }) => {
    const [value, setValue] = useState<string | null>(null);

    const handleChange = (e: any) => {
        setValue(() => e.target.value);
    };

    return (
        <div className="d-flex flex-column pb-3 gap-1">
            <span>joseph</span>
            <div
                style={{
                    position: 'relative',
                }}
            >
                <TextArea
                    rows={4}
                    placeholder="متن پیام"
                    maxLength={250}
                    style={{
                        resize: 'none',
                        width: '100%',
                        height: '100%',
                        boxSizing: 'border-box',
                    }}
                    showCount={true}
                    onChange={handleChange}
                />
                <Button
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        zIndex: 1,
                    }}
                    type="primary"
                    size="small"
                    onClick={onSubmit ? () => onSubmit(value) : undefined}
                >
                    ارسال
                </Button>
            </div>
        </div>
    );
};

export default LogComment;
