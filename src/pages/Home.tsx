import React from 'react';
import WrapperUserData from "../components/secondary/WrapperUserData";

export const Home: React.FC = () => {
    return (
        <>
            <WrapperUserData
                iconClicked={(v) => console.log(v)}
                imageUrl={'/src/assets/react.svg'}
                actionIcons={[
                    {
                        icon: "bi bi-trash",
                        event: "delete"
                    }
                ]}
            />
        </>
    );
};
