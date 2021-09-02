import React, { useContext } from "react";
import Slider from "../../../components/inputs/Slider";
import Switch from "../../../components/inputs/Switch";
import Cell from "../../../components/table/Cell";
import Row from "../../../components/table/Row";
import Container from "../../../components/table/Container";
import { updateOptions } from "../../../middleware";
import { RoomContext } from "..";

export default function OptionsTable() {
  const { isAdmin, options, type } = useContext(RoomContext);
  return (
    <Container>
      <Row>
        <Cell fontWeight="bold" width="200px">
          Keeped Pieces
        </Cell>
        <Cell>
          <Switch
            disabled={!isAdmin}
            onChange={(event) => {
              if (event.target.checked !== options.keep)
                updateOptions({ keep: event.target.checked });
            }}
            value={options.keep}
          />
        </Cell>
      </Row>
      <Row>
        <Cell fontWeight="bold" width="200px">
          Invisibility
        </Cell>
        <Cell>
          <Switch
            disabled={!isAdmin}
            onChange={(event) => {
              if (event.target.checked !== options.invisibility)
                updateOptions({ invisibility: event.target.checked });
            }}
            value={options.invisibility}
          />
        </Cell>
      </Row>
      <Row>
        <Cell fontWeight="bold" width="200px">
          Gravity
        </Cell>
        <Cell>
          <Slider
            disabled={!isAdmin}
            max={2}
            min={0.5}
            onChange={(_, value) => {
              if (value !== options.gravity) updateOptions({ gravity: value });
            }}
            step={0.5}
            value={options.gravity}
          />
        </Cell>
      </Row>
      {type !== "solo" && (
        <Row>
          <Cell fontWeight="bold" width="200px">
            Max Number of Players
          </Cell>
          <Cell>
            <Slider
              disabled={!isAdmin}
              max={4}
              min={1}
              onChange={(_, value) => {
                if (value !== options.nbPlayersMax)
                  updateOptions({ nbPlayersMax: value });
              }}
              value={options.nbPlayersMax}
            />
          </Cell>
        </Row>
      )}
    </Container>
  );
}
