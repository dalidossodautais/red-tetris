import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Icon from "../Icon";
import TextField from "../inputs/TextField";

export const CategoryContainer = styled.span.attrs((props) => ({
  color: props.theme.primaryTextColor,
}))`
  align-items: center;
  color: ${(props) => props.color};
  display: flex;
  justify-content: space-between;
  user-select: none;
`;

const Title = styled.h2``;

function useClasses() {
  return makeStyles((theme) => ({
    appBar: {
      backgroundColor: theme.primaryBackgroundColor,
    },
    toolbar: {
      alignItems: "center",
      display: "flex",
      height: "80px",
      justifyContent: "space-between",
    },
  }))();
}

export default function CardHeader({
  iconName,
  label,
  onChange,
  title,
  value,
  width = "180px",
}) {
  const classes = useClasses();
  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar className={classes.toolbar}>
        <CategoryContainer>
          <Icon className={classes.icon} marginRight="15px" type={iconName} />
          <Title>{title}</Title>
        </CategoryContainer>
        <TextField
          color="secondary"
          hide={!onChange}
          label={label}
          onChange={onChange}
          value={value}
          variant="outlined"
          width={width}
        />
      </Toolbar>
    </AppBar>
  );
}
