import React, { useContext } from "react";
import Container from "../../../components/card/Container";
import FooterContainer from "../../../components/card/FooterContainer";
import Header from "../../../components/card/Header";
import Button from "../../../components/inputs/Button";
import { leaveRoom, startGame } from "../../../middleware";
import { RoomContext } from "..";
import OptionsTable from "./OptionsTable";

export default function Options() {
  const { isAdmin, options } = useContext(RoomContext);
  return (
    <Container>
      <Header iconName="settings" title="Options" />
      <OptionsTable />
      <FooterContainer>
        <Button
          onClick={() => {
            leaveRoom(options);
          }}
          variant="outlined"
        >
          Leave
        </Button>
        <Button
          disabled={!isAdmin}
          onClick={() => {
            startGame();
          }}
          variant="outlined"
        >
          Start
        </Button>
      </FooterContainer>
    </Container>
  );
}
