import React, { PropsWithChildren } from "react";
import styles from "./Modal.module.scss";
import { Modal as MuiModal, ModalProps } from "@mui/material";

export interface IModalProps extends Omit<ModalProps, "children"> {
  onClose: () => void;
}

export const Modal: React.FC<PropsWithChildren<IModalProps>> = ({ children, ...props }) => {
  return (
    <MuiModal {...props}>
      <div className={styles.modal}>{children}</div>
    </MuiModal>
  );
};
