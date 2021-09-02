import React, { useContext } from "react";
import styled from "styled-components";
import Header from "../../../components/card/Header";
import Subtitle from "../../../components/texts/Subtitle";
import { RoomContext } from "..";
import Piece from "./Piece";

const Container = styled.div`
  background-color: #423434;
  border-radius: 5px;
  height: 100%;
  min-width: 400px;
  width: ${(props) => props.width};
`;

const GridsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function Additional({ playerName, width }) {
  const { [`game_${playerName}`]: { keeped, next } = {} } = useContext(
    RoomContext
  );
  if (!next) return null;
  return (
    <Container width={width}>
      <Header iconName="gamepad" title="Additional" />
      <Subtitle textAlign="center">Keeped Piece</Subtitle>
      <Piece grid={keeped} height={15} />
      <Subtitle textAlign="center">Next Pieces</Subtitle>
      <GridsContainer>
        {next.map((piece, index) => (
          <Piece grid={piece} height={15} key={index} />
        ))}
      </GridsContainer>
    </Container>
  );
}
