import React, { useContext } from "react";
import Icon from "../../../components/Icon";
import Cell from "../../../components/table/Cell";
import Container from "../../../components/table/Container";
import Row from "../../../components/table/Row";
import { changeAdmin } from "../../../middleware";
import { RoomContext } from "..";

export default function MembersTable() {
  const { isAdmin, members } = useContext(RoomContext);
  return (
    <Container>
      <Row>
        <Cell fontWeight="bold" width="500px">
          Name
        </Cell>
      </Row>
      {members.map((member, index) => (
        <Row key={index}>
          <Cell>{member.name}</Cell>
          <Cell>
            {member.type === "player" ? (
              <Icon tooltip="Player" type="player" />
            ) : (
              <Icon tooltip="Viewer" type="viewer" />
            )}
            {member.isAdmin ? (
              <Icon tooltip="Admin" type="admin" />
            ) : isAdmin ? (
              <Icon
                onClick={() => changeAdmin(member.name)}
                tooltip="Make Admin"
                type="nonAdmin"
              />
            ) : (
              <Icon tooltip="Non Admin" type="nonAdmin" />
            )}
          </Cell>
        </Row>
      ))}
    </Container>
  );
}
