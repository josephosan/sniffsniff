import React from 'react';
import TagWrapper from '../components/primary/TagWrapper';

export const Home: React.FC = () => {
    return (
        <>
            <TagWrapper
                tagList={[
                    {
                        text: 'hello',
                        color: 'primary',
                        closeIcon: <i className="bi bi-x-lg"></i>,
                        onClose: (e: any) => console.log(e),
                    },
                ]}
            />
        </>
    );
};
