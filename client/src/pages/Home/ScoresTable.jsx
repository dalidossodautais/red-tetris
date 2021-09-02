import React from "react";
import Icon from "../../components/Icon";
import Cell from "../../components/table/Cell";
import Container from "../../components/table/Container";
import Row from "../../components/table/Row";

export default function ScoreTable({ scores = [] }) {
  return (
    <Container>
      <Row>
        <Cell fontWeight="bold" width="320px">
          Name
        </Cell>
        <Cell fontWeight="bold" width="80px">
          Points
        </Cell>
        <Cell fontWeight="bold" width="100px">
          Type
        </Cell>
      </Row>
      {scores.map((score, index) => (
        <Row key={index}>
          <Cell width="320px">{score.name}</Cell>
          <Cell width="80px">{score.points}</Cell>
          <Cell width="100px">
            {score.options.keep && <Icon tooltip="Keeped Pieces" type="keep" />}
            {score.options.gravity < 1 && (
              <Icon tooltip={`Gravity ${score.gravity}`} type="speedDown" />
            )}
            {score.options.gravity > 1 && (
              <Icon tooltip={`Gravity ${score.gravity}`} type="speedUp" />
            )}
          </Cell>
        </Row>
      ))}
    </Container>
  );
}
