import { Modal } from 'antd';
import React from 'react';

interface ModalType {
    elements: JSX.Element;
    open: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    width?: number | string;
    title?: string;
    closable?: boolean;
    top?: number | string;
    mask?: boolean;
    right?: number | string;
    footer?: never;
    okText?: string;
    cancelText?: string;
    okDisable?: boolean;
    cancelDisable?: boolean;
}

const ModalWrapper: React.FC<ModalType> = ({
    elements,
    open,
    setOpenModal,
    width,
    title,
    closable,
    top,
    mask,
    right,
    footer,
    okText,
    cancelText,
    okDisable,
    cancelDisable,
}) => {
    return (
        <Modal
            wrapClassName="outside-modal"
            open={open}
            onCancel={(e) => {
                e.stopPropagation();
                setOpenModal(false);
            }}
            title={title}
            width={width}
            closable={closable}
            mask={mask}
            footer={footer}
            okText={okText}
            cancelText={cancelText}
            okButtonProps={{ disabled: okDisable }}
            cancelButtonProps={{ disabled: cancelDisable }}
            bodyStyle={{}}
            style={{
                top: top,
                right: right,
            }}
        >
            {elements}
        </Modal>
    );
};

export default ModalWrapper;
