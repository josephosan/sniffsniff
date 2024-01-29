import React, { useEffect } from 'react';
import { dateToPersian } from '../helpers/app.helper';

export const Home: React.FC = () => {
    useEffect(() => {
        console.log(dateToPersian('۱۴۰۲/۱۰/۲۳, ۱۶:۲۰:۳۴'));
    }, []);
    return <>home</>;
};
