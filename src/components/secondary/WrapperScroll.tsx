import React, { ReactNode, useRef } from 'react';

interface ScrollWrapperProps {
    children: ReactNode;
    height?: string;
    reachedBottom?: () => void;
    className?: string;
}

const WrapperScroll: React.FC<ScrollWrapperProps> = ({
    children,
    height = '85vh',
    reachedBottom,
    className,
}) => {
    const scrollWrapperRef = useRef(null);

    const handleScroll = () => {
        const container: ReactNode = scrollWrapperRef.current;
        if (container) {
            const isAtEnd =
                container.scrollTop + container.clientHeight >=
                container.scrollHeight - 10;
            if (isAtEnd) reachedBottom();
        }
    };

    return (
        <div
            ref={scrollWrapperRef}
            className={'w-100 ' + className}
            style={{
                overflowY: 'auto',
                overflowX: 'hidden',
                height: height ? height : '88vh',
            }}
            onScroll={handleScroll}
        >
            {children}
        </div>
    );
};

export default WrapperScroll;
