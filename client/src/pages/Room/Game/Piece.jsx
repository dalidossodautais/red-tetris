import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: ${(props) => props.height};
  justify-content: center;
`;

const LineContainer = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
`;

export default function Piece({ grid = [], height }) {
  const size = Math.floor(
    ((window.innerHeight / Math.max(grid.length, 4)) * height) / 100
  );
  return (
    <Container>
      <GridContainer height={`${height}vh`}>
        {grid.map((line, index) => (
          <LineContainer key={index}>
            {line.map((cell, index) => (
              <Cell cell={cell} empty key={index} size={size} />
            ))}
          </LineContainer>
        ))}
      </GridContainer>
    </Container>
  );
}
