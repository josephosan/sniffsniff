import React, {ReactNode} from 'react';
import {useMediaQuery} from 'react-responsive';
import {appConfig} from '../../config/app.config';
import {useApp} from '../../store/app.store';
import ActionIconWrapper from '../../components/secondary/ActionIconWrapper';
import TextItemWrapper from '../../components/tiny/TextItemWrapper';
import WrapperData from '../../components/secondary/WrapperData';
import TextItemWrapper from '../../components/tiny/TextItemWrapper';

interface UserDataProps {
    children: ReactNode;
    image?: string;
    title?: string;
    desc?: string;
}

const WrapperUserData: React.FC<UserDataProps> = (
    {
        children,
        image,
        title,
        desc
    }
) => {
    const isMobile = useMediaQuery({
        query: `(max-width: ${appConfig.appBreakPoint}px)`,
    });
    const { theme } = useApp();
     return (
        <>
         
        </>
    );
};