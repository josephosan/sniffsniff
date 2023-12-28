import React from "react";
import {useApp} from "../../store/app.store";

interface UnderlinedLinkProps {
    onElementClick?: () => void,
    text?: string
}

const UnderlinedLink: React.FC<UnderlinedLinkProps> = (
    {
        onElementClick,
        text = 'لینک'
    }
) => {
    const {theme} = useApp();

    return (
        <div onClick={onElementClick}>
                <span
                    style={{
                        textDecoration: "underline",
                        paddingBottom: '3px',
                        textDecorationSkipInk: 'none',
                        textDecorationColor: theme.primaryColor,
                        cursor: 'pointer',
                        color: theme.fadeTextColor
                    }}
                >
                    {text}
                </span>
        </div>
    );
}

export default UnderlinedLink;