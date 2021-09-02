import React, { useEffect, useReducer, useState } from "react";
import Container from "../../components/card/Container";
import FooterContainer from "../../components/card/FooterContainer";
import Header from "../../components/card/Header";
import CreationButton from "./CreationButton";
import JoiningButton from "./JoiningButton";
import RoomsTable from "./RoomsTable";
import { handleRooms, unhandleRooms } from "../../middleware";

export default function Rooms() {
  const [search, setSearch] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selected, setSelected] = useReducer((prev, next) => {
    if (next) return next;
    if (prev === {} || !rooms.some((room) => room.name === prev.name))
      return {};
    return undefined;
  }, {});
  useEffect(() => {
    handleRooms(setRooms, setSelected);
    return () => {
      unhandleRooms();
    };
  }, [setRooms, setSelected]);
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
        title="Rooms"
        value={search}
      />
      <RoomsTable
        rooms={rooms.filter((room) => room.name.startsWith(search))}
        selected={selected}
        setSelected={setSelected}
      />
      <FooterContainer>
        <CreationButton />
        <JoiningButton selected={selected} />
      </FooterContainer>
    </Container>
  );
}
