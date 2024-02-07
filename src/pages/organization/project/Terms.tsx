import React, { useEffect, useState } from 'react';
import TaskTermList from './term/list/Task';
import Emitter from '../../../helpers/emitter.helper';
import SelectTermList from './term/list/Select';
import { termType } from '../../../@types/app';

const ProjectTerms: React.FC = React.memo(() => {
    const [selectVisible, setSelectVisible] = useState<boolean>(true);

    const [termType, setTermType] = useState<termType | null>(null);

    useEffect(() => {
        Emitter.on('openTermTypeSelect', () => setSelectVisible(true));

        return () => {
            Emitter.off('openTermTypeSelect');
        };
    }, []);

    const itemSelecte = (value: termType) => {
        setTermType(value);
        setSelectVisible(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            <SelectTermList visible={selectVisible} onSelect={itemSelecte} />
            {termType === 'task' ? <TaskTermList /> : <TaskTermList />}
        </div>
    );
});

export default ProjectTerms;
