import React from 'react';
import TabComponent from "../components/primary/TabComponent";

export const Home: React.FC = () => {
    return (
        <>
            <TabComponent
                type={"card"}
                items={[
                    {
                        label: "tab1",
                        icon: "bi bi-eye",
                        children: <div>hello</div>
                    }
                ]}
            />
        </>
    );
};
