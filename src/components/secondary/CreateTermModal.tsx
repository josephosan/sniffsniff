import React from 'react';
import ModalWrapper from './WrapperModal';
import TermTypeItem from '../tiny/TermTypeItem';
import { appConfig, statusColors } from '../../config/app.config';
import { useNavigate } from 'react-router-dom';

interface CreateTermModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const CreateTermModal: React.FC<CreateTermModalProps> = ({ open, setOpen }) => {
    const navigate = useNavigate();

    return (
        <ModalWrapper
            width={550}
            open={open}
            closable={true}
            setOpenModal={setOpen}
            elements={
                <div className="d-flex flex-column pt-5 p-2">
                    <div className="row">
                        <TermTypeItem
                            color={statusColors.warning}
                            icon="bi bi-list-task"
                            title="تسک"
                            onClick={() => navigate(`create?type=task`)}
                        />
                        <TermTypeItem
                            color={statusColors.success}
                            icon="bi bi-clock"
                            title="یادآور"
                            onClick={() => navigate(`create?type=reminder`)}
                        />
                    </div>
                    <hr />
                    <div
                        className="text-center"
                        style={{ fontSize: appConfig.defaultFontSize }}
                    >
                        نوع ترم جدید را انتخاب کنید
                    </div>
                </div>
            }
            footer={null}
        />
    );
};

export default CreateTermModal;
