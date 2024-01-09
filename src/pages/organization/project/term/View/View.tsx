import React from 'react';
import { useLocation } from 'react-router-dom';
import ViewTaskTerm from './Task';

const ViewTerm: React.FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const type = query.get('type');

    return (
        <>{type === 'task' ? <ViewTaskTerm /> : <div>invalid term type</div>}</>
    );
};

export default ViewTerm;
