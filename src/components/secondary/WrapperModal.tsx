import { Modal, Button, Space } from "antd";
import { appConfig } from "../../config/app.config";
import React, { useState } from "react";

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
  footer?: any;
  okText?: string;
  cancelText?: string;
  okDisable?: boolean;
  cancleDisable?: boolean;
}

export default function ModalWrapper({
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
  cancleDisable,
}: ModalType) {
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
      cancelButtonProps={{ disabled: cancleDisable }}
      bodyStyle={{}}
      style={{
        top: top,
        right: right,
      }}
    >
      {elements}
    </Modal>
  );
}
