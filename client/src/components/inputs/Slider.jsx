import React from "react";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

function useClasses() {
  return makeStyles(() => ({
    slider: {
      width: "200px",
    },
  }))();
}

export default function ({ disabled, max, min, onChange, step, value = 0 }) {
  const classes = useClasses();
  return (
    <Slider
      className={classes.slider}
      disabled={disabled}
      marks
      max={max}
      min={min}
      onChange={onChange}
      step={step}
      value={value}
      valueLabelDisplay="auto"
    />
  );
}
