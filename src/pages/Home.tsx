import React from 'react';
import WrapperData from '../components/secondary/WrapperData';
import WrapperGlow from '../components/secondary/WrapperGlow';

export const Home: React.FC = () => {
    return (
        <>
            <WrapperGlow>
                <WrapperData color={'pink'}>
                    <h1>Title</h1>
                    <p>Description</p>
                </WrapperData>
            </WrapperGlow>
        </>
    );
};
