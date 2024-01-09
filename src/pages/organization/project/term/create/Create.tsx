import React from 'react';
import CreateTaskTerm from './Task';
import { useLocation } from 'react-router-dom';

const CreateTerm: React.FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    return (
        <>
            {query.get('type') === 'task' ? (
                <CreateTaskTerm />
            ) : (
                <div>type not defined</div>
            )}
        </>
    );
};

export default CreateTerm;
