import React from "react";
import styled from "styled-components";

function darken(colorPart) {
  return (colorPart * 3) / 4;
}
function lighten(colorPart) {
  return (colorPart * 5) / 4;
}

const colors = (() => {
  const basics = {
    I /* Cyan */: "rgb(0,184,212)",
    J /* Pink */: "rgb(233,30,99)",
    L /* Orange */: "rgb(255,109,0)",
    O /* Yellow */: "rgb(255,214,0)",
    S /* Teal */: "rgb(0,150,136)",
    T /* Deep Purtle */: "rgb(103,58,183)",
    Z /* Red */: "rgb(244,67,54)",
    full: "rgb(64,64,64)",
    shadow: "rgb(192,192,192)",
    null: "rgb(220,220,220)",
  };
  const merged = {};
  Object.entries(basics).forEach(([key, basic]) => {
    const parted = basic.match(/\d+/g);
    merged[key] = {
      basic,
      dark: `rgb(${darken(parted[0])},${darken(parted[1])},${darken(
        parted[2]
      )})`,
      light: `rgb(${lighten(parted[0])},${lighten(parted[1])},${lighten(
        parted[2]
      )})`,
    };
  });
  return merged;
})();

const StyledCell = styled.div.attrs((props) => {
  if (!props.transparent)
    return {
      backgroundColor: props.basic,
      borderBottomColor: props.dark,
      borderLeftColor: props.light,
      borderRightColor: props.dark,
      borderTopColor: props.light,
    };
  return {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "transparent",
  };
})`
  background-color: ${(props) => props.backgroundColor};
  border-bottom-color: ${(props) => props.borderBottomColor};
  border-left-color: ${(props) => props.borderLeftColor};
  border-right-color: ${(props) => props.borderRightColor};
  border-style: solid;
  border-width: ${(props) => props.size * 0.05}px;
  border-top-color: ${(props) => props.borderTopColor};
  height: ${(props) => props.size * 0.9}px;
  opacity: ${(props) => props.opacity};
  width: ${(props) => props.size * 0.9}px;
`;

export default function Cell({ cell = null, empty, opacity, size }) {
  const { basic, dark, light } = colors[cell];
  return (
    <StyledCell
      basic={basic}
      dark={dark}
      light={light}
      opacity={opacity}
      size={size}
      transparent={empty && !cell}
    />
  );
}
