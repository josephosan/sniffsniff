import { Modal, Button, Space } from "antd";
import { appConfig } from "../../config/app.config";
import React, { useState } from "react";
interface ModalType {
  elements: JSX.Element;
  open: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalWrapper({
  elements,
  open,
  setOpenModal,
}: ModalType) {
  return (
    <>
      <Modal
        open={open}
        onCancel={(e) => {
          e.stopPropagation();
          setOpenModal(false);
        }}
        closable={false}
        footer={null}
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {elements}
      </Modal>
    </>
  );
}
