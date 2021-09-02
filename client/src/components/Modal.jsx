import React from "react";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

const Paper = styled.div.attrs((props) => ({
  backgroundColor: props.theme.terciaryBackgroundColor,
  color: props.theme.primaryTextColor,
}))`
  border-style: solid;
  border-width: 2px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  width: 800px;
`;

function useClasses() {
  return makeStyles(() => ({
    modal: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
  }))();
}

export default function ({ children, onClose, onKeyUp, open }) {
  const classes = useClasses();
  return (
    <Modal
      className={classes.modal}
      onClose={onClose}
      onKeyUp={onKeyUp}
      open={!!open}
    >
      <Paper>{children}</Paper>
    </Modal>
  );
}
