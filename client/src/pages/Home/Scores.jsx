import React, { useEffect, useState } from "react";
import Container from "../../components/card/Container";
import Header from "../../components/card/Header";
import { handleScores, unhandleScores } from "../../middleware";
import ScoresTable from "./ScoresTable";

export default function Scores() {
  const [scores, setScores] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    handleScores(setScores);
    return () => {
      unhandleScores();
    };
  }, []);
  return (
    <Container>
      <Header
        iconName="gamepad"
        label="Search"
        onChange={(event) => {
          setSearch(
            event.target.value.replace(/[^0-9A-Za-z _-]/g, "").slice(0, 20)
          );
        }}
        title="Scores"
        value={search}
      />
      <ScoresTable
        scores={scores.filter((score) => score.name.startsWith(search))}
      />
    </Container>
  );
}
