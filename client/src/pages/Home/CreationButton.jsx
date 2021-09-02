import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/inputs/Button";
import Select from "../../components/inputs/Select";
import TextField from "../../components/inputs/TextField";
import Title from "../../components/texts/Title";
import Modal from "../../components/Modal";
import Toolbar from "../../components/Toolbar";
import { createRoom, handleCreation, unhandleCreation } from "../../middleware";

const InputContainer = styled.div`
  display: flex;
  height: 50px;
  margin-left: 30px;
  margin-top: 15px;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function CreationButton() {
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("solo");
  const [isOpened, setOpened] = useState(false);
  useEffect(() => {
    handleCreation(setError);
    return () => {
      unhandleCreation();
    };
  }, [setError]);
  useEffect(() => {
    return () => {
      setError(null);
      setName("");
    };
  }, [isOpened, setError, setName]);
  return (
    <>
      <Button
        onClick={() => {
          setOpened(true);
        }}
        variant="outlined"
      >
        Create
      </Button>
      <Modal
        onClose={() => setOpened(false)}
        onKeyUp={(event) => {
          if (event.key === "Enter")
            createRoom({ name, password, type }, setError);
        }}
        open={isOpened}
      >
        <Toolbar marginbottom="10px">
          <Title fontWeight="normal">Choose a room name</Title>
        </Toolbar>
        <InputContainer>
          <Select
            choices={[
              { label: "Solo", value: "solo" },
              { label: "Public", value: "public" },
              { label: "Private", value: "private" },
            ]}
            label="Gamemode"
            onChange={(event) => {
              setType(event.target.value);
            }}
            value={type}
            variant="outlined"
          />
          <TextField
            error={error && error.name ? error.name : null}
            hide={!["public", "private"].includes(type)}
            label="Room name"
            onChange={(event) => {
              setName(
                event.target.value.replace(/[^0-9A-Za-z _-]/g, "").slice(0, 20)
              );
              setError(null);
            }}
            value={name}
            variant="outlined"
          />
          <TextField
            error={error && error.password ? error.password : null}
            hide={type !== "private"}
            label="Password"
            onChange={(event) => {
              setPassword(event.target.value.slice(0, 20));
              setError(null);
            }}
            type="password"
            value={password}
            variant="outlined"
          />
        </InputContainer>
        <FooterContainer>
          <Button
            disabled={
              !!error ||
              (["public", "private"].includes(type) && name.length < 3) ||
              (type === "private" && password.length < 3)
            }
            onClick={() => createRoom({ name, password, type }, setError)}
            variant="contained"
          >
            Create
          </Button>
        </FooterContainer>
      </Modal>
    </>
  );
}
