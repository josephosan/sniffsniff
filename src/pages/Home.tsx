import React from 'react';
import WrapperMessage from "../components/secondary/WrapperMessage";
import SegmentedWrapper from "../components/secondary/SegmentedWrapper";


export const Home: React.FC = () => {
    return (
        <>
            <SegmentedWrapper
                block={false}
                options={
                    [
                        {
                            label: 'hello',
                            value: 1,
                        },
                        {
                            label: 'name',
                            value: 2,
                        },
                        {
                            label: 'another',
                            value: 3,
                        },
                    ]
                }
            />
        </>
    );
};
