import React from "react";
import Icon from "../../components/Icon";
import Cell from "../../components/table/Cell";
import Container from "../../components/table/Container";
import Row from "../../components/table/Row";

export default function RoomsTable({ rooms = [], selected = {}, setSelected }) {
  return (
    <Container>
      <Row>
        <Cell fontWeight="bold" width="240px">
          Name
        </Cell>
        <Cell fontWeight="bold" width="80px">
          Players
        </Cell>
        <Cell fontWeight="bold" width="80px">
          Viewers
        </Cell>
        <Cell fontWeight="bold" width="100px">
          Type
        </Cell>
      </Row>
      {rooms.map((room, index) => (
        <Row
          key={index}
          onClick={() => setSelected(room)}
          selected={selected.name === room.name}
        >
          <Cell width="240px">{room.name}</Cell>
          <Cell width="80px">{`${room.nbPlayers} / ${room.options.nbPlayersMax}`}</Cell>
          <Cell width="80px">{room.nbViewers}</Cell>
          <Cell width="100px">
            {room.type === "private" && (
              <Icon tooltip="Private" type="private" />
            )}
            {room.options.keep && <Icon tooltip="Keeped Pieces" type="keep" />}
            {room.options.gravity < 1 && (
              <Icon
                tooltip={`Gravity ${room.options.gravity}`}
                type="speedDown"
              />
            )}
            {room.options.gravity > 1 && (
              <Icon
                tooltip={`Gravity ${room.options.gravity}`}
                type="speedUp"
              />
            )}
          </Cell>
        </Row>
      ))}
    </Container>
  );
}
