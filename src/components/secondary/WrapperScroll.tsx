import React, {ReactNode, useRef} from "react";

interface ScrollWrapperProps {
    children: ReactNode,
    height?: string,
    reachedBottom?: () => void
}

const WrapperScroll: React.FC<ScrollWrapperProps> = (
    {
        children,
        height = "83vh",
        reachedBottom
    }
) => {
    const scrollWrapperRef = useRef(null);

    const handleScroll = () => {
        const container: ReactNode = scrollWrapperRef.current;
        if (container) {
            const isAtEnd = container.scrollTop + container.clientHeight >= (container.scrollHeight-10);
            if (isAtEnd) reachedBottom();
        }
    }

    return (
        <div
            ref={scrollWrapperRef}
            className={"w-100"}
            style={{
                overflowY: "auto",
                height: height ? height : '88vh'
            }}
            onScroll={handleScroll}
        >
            {children}
        </div>
    );
}

export default WrapperScroll;