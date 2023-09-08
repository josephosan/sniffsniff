import React from "react";

interface TextProps {
    text: string
}

const Test: React.FC<TextProps> = ({ text }) => {
    return (
        <>
            <button>{ text }</button>
        </>
    );
}

export default Test;