import React, { useContext } from "react";
import styled from "styled-components";
import { RoomContext } from "..";
import Cell from "./Cell";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridContainer = styled.div.attrs((props) => ({
  height: `${props.heightInVh}vh`,
}))`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: ${(props) => props.height};
  justify-content: center;
`;

const LineContainer = styled.div`
  background-color: black;
  display: flex;
  flex-direction: row;
`;

const Text = styled.a.attrs((props) => ({
  color: props.theme.primaryTextColor,
  fontSize: `${(props.heightInVh * 8) / 10}vh`,
  height: `${props.heightInVh}vh`,
}))`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  height: ${(props) => props.height};
  text-overflow: ellipsis;
`;

export default function Grid({ heightInVh, playerName }) {
  const {
    [`game_${playerName}`]: { grid, isPlaying, points } = {},
  } = useContext(RoomContext);
  const fontHeightInVh = heightInVh / 20;
  if (!grid) return null;
  const size = Math.floor(
    ((window.innerHeight / Math.max(grid.length, 4)) * heightInVh) / 100
  );
  return (
    <Container>
      <GridContainer heightInVh={`${heightInVh - fontHeightInVh}vh`}>
        {grid.map((line, index) => (
          <LineContainer key={index}>
            {line.map((cell, index) => (
              <Cell
                cell={cell}
                key={index}
                opacity={isPlaying ? 1 : 0.3}
                size={size}
              />
            ))}
          </LineContainer>
        ))}
      </GridContainer>
      <Text
        heightInVh={fontHeightInVh}
      >{`${playerName} with ${points} points`}</Text>
    </Container>
  );
}
