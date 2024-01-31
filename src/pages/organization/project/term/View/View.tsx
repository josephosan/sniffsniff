import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ViewTaskTerm from './Task';
import Reminder from './Reminder';

const ViewTerm: React.FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const type = query.get('type');

    useEffect(() => {
        console.log(type);
    }, []);

    return <>{type === 'task' ? <ViewTaskTerm /> : <Reminder />}</>;
};

export default ViewTerm;
