import React from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

function useContainedClasses() {
  return makeStyles((theme) => ({
    button: {
      alignSelf: "flex-end",
      backgroundColor: theme.primaryBackgroundColor,
      color: theme.primaryTextColor,
      "&:hover": {
        backgroundColor: theme.primaryBackgroundColor,
        color: theme.primaryTextColor,
        opacity: 0.9,
      },
    },
  }))();
}

function ContainedButton({ children, disabled, onClick }) {
  const classes = useContainedClasses();
  return (
    <Button
      className={classes.button}
      disabled={disabled}
      onClick={onClick}
      variant="contained"
    >
      {children}
    </Button>
  );
}

function useOutlinedClasses() {
  return makeStyles((theme) => ({
    button: {
      borderColor: theme.primaryBackgroundColor,
      borderWidth: "2px",
      color: theme.primaryBackgroundColor,
      width: "49.8%",
    },
  }))();
}

function OutlinedButton({ children, disabled, onClick }) {
  const classes = useOutlinedClasses();
  return (
    <Button
      className={classes.button}
      disabled={disabled}
      onClick={onClick}
      variant="outlined"
    >
      {children}
    </Button>
  );
}

export default function ({ children, disabled, onClick, variant }) {
  if (variant === "contained")
    return (
      <ContainedButton disabled={disabled} onClick={onClick}>
        {children}
      </ContainedButton>
    );
  if (variant === "outlined")
    return (
      <OutlinedButton disabled={disabled} onClick={onClick}>
        {children}
      </OutlinedButton>
    );
  return null;
}
