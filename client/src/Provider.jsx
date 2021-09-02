import React, { createContext, useCallback, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  createMuiTheme,
  ThemeProvider as MaterialThemeProvider,
} from "@material-ui/core/styles";

const themeDefault = {
  name: "Red",
  primaryBackgroundColor: "red",
  primaryTextColor: "white",
  secondaryBackgroundColor: "orangered",
  secondaryTextColor: "black",
  terciaryBackgroundColor: "#423434",
};

const themes = [
  {},
  {
    name: "Dark Red",
    primaryBackgroundColor: "darkred",
    primaryTextColor: "white",
    secondaryBackgroundColor: "black",
  },
  {
    name: "Blue",
    primaryBackgroundColor: "blue",
    primaryTextColor: "white",
    secondaryBackgroundColor: "black",
  },
  {
    name: "Green",
    primaryBackgroundColor: "green",
    primaryTextColor: "white",
    secondaryBackgroundColor: "black",
  },
  {
    name: "Yellow",
    primaryBackgroundColor: "yellow",
    primaryTextColor: "purple",
    secondaryBackgroundColor: "black",
  },
  {
    name: "White",
    primaryBackgroundColor: "white",
    primaryTextColor: "black",
    secondaryBackgroundColor: "black",
  },
  {
    name: "Black",
    primaryBackgroundColor: "black",
    primaryTextColor: "white",
    secondaryBackgroundColor: "black",
    secondaryTextColor: "white",
  },
  {
    name: "Grey",
    primaryBackgroundColor: "grey",
    primaryTextColor: "white",
    secondaryBackgroundColor: "black",
  },
  {
    name: "Hot Pink",
    primaryBackgroundColor: "hotpink",
    primaryTextColor: "white",
    secondaryBackgroundColor: "black",
  },
  {
    name: "Purple",
    primaryBackgroundColor: "purple",
    primaryTextColor: "white",
    secondaryBackgroundColor: "black",
  },
  {
    name: "Orange",
    primaryBackgroundColor: "orange",
    primaryTextColor: "white",
    secondaryBackgroundColor: "black",
  },
];

export const Context = createContext({});

export default function Provider({ children }) {
  const [pathError, setPathError] = useState("");
  const [theme, setThemeState] = useState({ ...themeDefault, ...themes[0] });
  const [username, setUsername] = useState(undefined);
  const [usernameError, setUsernameError] = useState("");
  const setTheme = useCallback(() => {
    themes.push(themes.shift());
    setThemeState({ ...themeDefault, ...themes[0] });
  }, []);
  return (
    <Context.Provider
      value={{
        pathError,
        setPathError,
        setTheme,
        setUsername,
        setUsernameError,
        theme,
        username,
        usernameError,
      }}
    >
      <StyledThemeProvider theme={theme}>
        <MaterialThemeProvider theme={createMuiTheme(theme)}>
          {children}
        </MaterialThemeProvider>
      </StyledThemeProvider>
    </Context.Provider>
  );
}
