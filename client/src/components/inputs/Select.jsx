import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";

function useOutlinedClasses() {
  return makeStyles((theme) => ({
    select: {
      color: "yellow",
      "& .MuiSelect-root": {
        color: theme.secondaryTextColor,
      },
      "& .MuiSelect-iconOutlined": {
        color: theme.secondaryTextColor,
      },
      "& .MuiFormLabel-root": {
        color: "yellow",
        backgroundColor: "yellow",
      },
      marginRight: "20px",
      width: "150px",
    },
  }))();
}

function OutlinedSelect({ choices, label, onChange, value }) {
  const classes = useOutlinedClasses();
  return (
    <FormControl variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        className={classes.select}
        label={label}
        onChange={onChange}
        value={value}
        variant="outlined"
      >
        {choices.map((choice, index) => (
          <MenuItem key={index} value={choice.value}>
            {choice.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default function ({
  choices = [],
  label,
  onChange,
  value = "",
  variant,
}) {
  if (variant === "outlined")
    return (
      <OutlinedSelect
        choices={choices}
        label={label}
        onChange={onChange}
        value={value}
      />
    );
  return null;
}
