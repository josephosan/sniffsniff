import React, { createRef, useEffect } from 'react';
import { appConfig, statusColors } from '../../../../../config/app.config';
import TermTypeItem from '../../../../../components/tiny/TermTypeItem';
import { termType } from '../../../../../@types/app';
import { useApp } from '../../../../../store/app.store';

interface SelectTermListProps {
    visible: boolean;
    onSelect: (value: termType) => void;
}

const SelectTermList: React.FC<SelectTermListProps> = ({
    visible,
    onSelect,
}) => {
    const cRef = createRef();
    const { theme } = useApp();

    useEffect(() => {
        if (!visible) {
            cRef.current.style.backgroundColor = 'transparent';
            cRef.current.style.opacity = 0;
            cRef.current.style.zIndex = -1;
        } else {
            cRef.current.style.backgroundColor = theme.cardBg;
            cRef.current.style.zIndex = 100;
            cRef.current.style.opacity = 100;
        }
    }, [visible]);

    return (
        <div
            ref={cRef}
            className="w-100 h-100 d-flex flex-wrap justify-content-center align-items-center"
            style={{
                position: 'absolute',
                borderRadius: appConfig.defaultBorderRadius,
                transition: `all ${appConfig.defaultAnimationSpeed}s ease`,
            }}
        >
            <TermTypeItem
                color={statusColors.success}
                icon="bi bi-clock"
                title="یادآور"
                onClick={() => onSelect('reminder')}
            />
            <TermTypeItem
                color={statusColors.warning}
                icon="bi bi-list-task"
                title="تسک"
                onClick={() => onSelect('task')}
            />
            <TermTypeItem
                color={statusColors.info}
                icon="bi bi-person-exclamation"
                title="آزمون"
                onClick={() => onSelect('exam')}
            />
        </div>
    );
};

export default SelectTermList;
