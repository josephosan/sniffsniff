import { Modal } from 'antd';
import React from 'react';

interface ModalType {
    elements: JSX.Element;
    open: boolean;
    setOpenModal: (value: boolean) => void;
    width?: number | string;
    title?: string;
    closable?: boolean;
    top?: number | string;
    left?: number | string;
    mask?: boolean;
    right?: number | string;
    footer?: never | null;
    okText?: string;
    cancelText?: string;
    okDisable?: boolean;
    cancelDisable?: boolean;
    destroyOnClose?: boolean;
}

const ModalWrapper: React.FC<ModalType> = React.memo(
    ({
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
        left,
        destroyOnClose = false,
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
                destroyOnClose={destroyOnClose}
                style={{
                    top: top,
                    right: right,
                    left: left,
                }}
            >
                {elements}
            </Modal>
        );
    },
);

export default ModalWrapper;
