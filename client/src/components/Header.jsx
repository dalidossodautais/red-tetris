import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core";
import Spacing from "./Spacing";
import MainTitle from "./texts/MainTitle";

function useClasses() {
  return makeStyles((theme) => ({
    appBar: {
      alignItems: "center",
      backgroundColor: theme.primaryBackgroundColor,
      color: theme.primaryTextColor,
      display: "flex",
      height: "8vh",
      minHeight: "48px",
      justifyContent: "center",
      userSelect: "none",
      width: "100%",
    },
  }))();
}

export default function Header({ children, onClick }) {
  const classes = useClasses();
  return (
    <>
      <AppBar className={classes.appBar} onClick={onClick}>
        <MainTitle>{children}</MainTitle>
      </AppBar>
      <Spacing height="10vh" minHeight="60px" width="100%" />
    </>
  );
}
