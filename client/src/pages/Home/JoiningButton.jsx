import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/inputs/Button";
import TextField from "../../components/inputs/TextField";
import Modal from "../../components/Modal";
import Title from "../../components/texts/Title";
import Toolbar from "../../components/Toolbar";
import { handleJoining, joinRoom, unhandleJoining } from "../../middleware";

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

export default function JoiningButton({ selected = {} }) {
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [isOpened, setOpened] = useState(false);
  useEffect(() => {
    handleJoining(setError);
    return () => {
      unhandleJoining();
    };
  }, [setError]);
  useEffect(() => {
    return () => {
      setError(null);
      setPassword("");
    };
  }, [isOpened, setError, setPassword]);
  return (
    <>
      <Button
        disabled={!selected.name}
        onClick={() => {
          if (selected.type === "private") setOpened(true);
          else joinRoom({ name: selected.name }, setError);
        }}
        variant="outlined"
      >
        Join
      </Button>
      <Modal
        onClose={() => {
          setOpened(false);
        }}
        onKeyUp={(event) => {
          if (event.key === "Enter")
            joinRoom({ name: selected.name, password }, setError);
        }}
        open={isOpened}
      >
        <Toolbar>
          <Title fontWeight="normal">Enter the password</Title>
        </Toolbar>
        <InputContainer>
          <TextField
            error={error && error.password ? error.password : null}
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
            disabled={!!error || password.length < 3}
            onClick={() =>
              joinRoom({ name: selected.name, password }, setError)
            }
            variant="contained"
          >
            Join
          </Button>
        </FooterContainer>
      </Modal>
    </>
  );
}
