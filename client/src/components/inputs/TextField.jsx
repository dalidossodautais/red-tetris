import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

function useOutlinedClasses(color, width) {
  return makeStyles((theme) => {
    const mainColor =
      color === "primary"
        ? theme.primaryBackgroundColor
        : theme.primaryTextColor;
    const secondaryColor =
      color === "primary" ? theme.secondaryTextColor : theme.primaryTextColor;
    return {
      textField: {
        marginRight: "20px",
        "& label": {
          color: secondaryColor,
        },
        "& label.Mui-focused": {
          color: secondaryColor,
        },
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: mainColor,
          },
        },
        "& input:valid + fieldset": {
          borderColor: mainColor,
        },
        "& input:invalid + fieldset": {
          borderColor: mainColor,
        },
        "& input:valid:focus + fieldset": {
          borderColor: mainColor,
        },
        width,
      },
      textFieldInput: {
        color: secondaryColor,
      },
    };
  })();
}

function OutlinedTextField({
  color,
  disabled,
  error,
  helperText,
  label,
  onChange,
  type,
  value,
  width,
}) {
  const classes = useOutlinedClasses(color, width);
  return (
    <TextField
      className={classes.textField}
      disabled={disabled}
      error={error}
      helperText={helperText}
      label={label}
      onChange={onChange}
      type={type}
      value={value}
      InputProps={{ className: classes.textFieldInput }}
      variant="outlined"
    />
  );
}

export default function ({
  color = "primary",
  disabled,
  error,
  hide,
  label,
  onChange,
  type = "text",
  value,
  variant,
  width = "200px",
}) {
  if (hide) return null;
  const helperText = error;
  error = !!error;
  if (variant === "outlined")
    return (
      <OutlinedTextField
        color={color}
        disabled={disabled}
        error={error}
        helperText={helperText}
        label={label}
        onChange={onChange}
        type={type}
        value={value}
        width={width}
      />
    );
  return null;
}
