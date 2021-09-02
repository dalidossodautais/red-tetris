import React, { useContext } from "react";
import Container from "../../../components/card/Container";
import FooterContainer from "../../../components/card/FooterContainer";
import Header from "../../../components/card/Header";
import Button from "../../../components/inputs/Button";
import { setMemberStatus } from "../../../middleware";
import { RoomContext } from "..";
import MembersTable from "./MembersTable";

export default function Members() {
  const { isPlayer, members, options, type } = useContext(RoomContext);
  if (type === "solo") return null;
  return (
    <Container>
      <Header iconName="people" title="Members" />
      <MembersTable />
      <FooterContainer>
        <Button
          disabled={
            isPlayer ||
            options.nbPlayersMax <=
              members.reduce(
                (acc, member) => acc + (member.type === "player"),
                0
              )
          }
          onClick={() => setMemberStatus("player")}
          variant="outlined"
        >
          Become Player
        </Button>
        <Button
          disabled={!isPlayer}
          onClick={() => setMemberStatus("viewer")}
          variant="outlined"
        >
          Become Viewer
        </Button>
      </FooterContainer>
    </Container>
  );
}
