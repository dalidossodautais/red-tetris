import React from "react";
import Container from "../../../components/Container";
import Members from "./Members";
import Options from "./Options";

export default function Lobby() {
  return (
    <Container>
      <Options />
      <Members />
    </Container>
  );
}
