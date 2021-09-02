import React from "react";
import styled from "styled-components";
import Rooms from "./Rooms";
import Scores from "./Scores";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
`;

export default function Home() {
  return (
    <BodyContainer>
      <Rooms />
      <Scores />
    </BodyContainer>
  );
}
