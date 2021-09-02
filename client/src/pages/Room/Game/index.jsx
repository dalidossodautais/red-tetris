import React, { useContext, useEffect, useMemo } from "react";
import styled from "styled-components";
import { RoomContext } from "..";
import { handleGames, unhandleGames } from "../../../middleware";
import Additional from "./Additional";
import Grid from "./Grid";
import Listeners from "./Listeners";

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
`;

const SubContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  @media (max-width: ${(props) => 2.5 * props.elementWidth}px) {
    display: none;
  }
`;

export default function Game() {
  const { isPlayer, options, playerNames, setGame } = useContext(RoomContext);
  useEffect(() => {
    handleGames(setGame, playerNames);
    return () => {
      unhandleGames(playerNames);
    };
  }, [playerNames, setGame]);
  const mainHeightInVh = 85;
  const elementWidth = useMemo(
    () =>
      (((window.innerHeight / options.height) * mainHeightInVh) / 100) *
      options.width,
    [options.height, mainHeightInVh, options.width]
  );
  const [mainPlayerName, ...secondaryPlayerNames] = playerNames;
  return (
    <Container>
      {mainPlayerName && (
        <>
          {isPlayer && <Listeners />}
          <Grid heightInVh={mainHeightInVh} playerName={mainPlayerName} />
          <Additional playerName={mainPlayerName} width={`${elementWidth}px`} />
        </>
      )}
      <SubContainer elementWidth={elementWidth}>
        {secondaryPlayerNames.map((playerName, index) => (
          <Grid
            heightInVh={mainHeightInVh / 3}
            key={index}
            playerName={playerName}
          />
        ))}
      </SubContainer>
    </Container>
  );
}
