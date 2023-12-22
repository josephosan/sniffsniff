import React from "react";
import WrapperMessage from "./WrapperMessage";
import UnderlinedLink from "./UnderlinedLink";

const NotificationModalMessages: React.FC = () => {
    return (
        <>
            <div className={"p-1 gap-1"}>
                <WrapperMessage/>

                <div className={"d-flex justify-content-center mt-3"}>
                    <UnderlinedLink
                        text={"بیشتر"}
                    />
                </div>
            </div>
        </>
    );
}

export default NotificationModalMessages;