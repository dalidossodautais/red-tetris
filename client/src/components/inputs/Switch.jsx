import React from "react";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

function useClasses() {
  return makeStyles(() => ({}))();
}

export default function ({ disabled, onChange, value }) {
  const classes = useClasses();
  return (
    <Switch
      checked={value}
      className={classes.switch}
      disabled={disabled}
      onChange={onChange}
    />
  );
}
