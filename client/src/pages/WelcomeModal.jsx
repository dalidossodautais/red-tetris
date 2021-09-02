import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import Button from "../components/inputs/Button";
import TextField from "../components/inputs/TextField";
import Title from "../components/texts/Title";
import Modal from "../components/Modal";
import Toolbar from "../components/Toolbar";
import { saveUsername } from "../middleware";
import { Context } from "../Provider";

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

export function Content({ input, setInput }) {
  const { setUsernameError, username, usernameError } = useContext(Context);
  useEffect(() => {
    return () => {
      setUsernameError(null);
      setInput("");
    };
  }, [username, setInput, setUsernameError]);
  return (
    <>
      <Toolbar>
        <Title fontWeight="normal">Choose my username</Title>
      </Toolbar>
      <InputContainer>
        <TextField
          error={usernameError}
          label="My username"
          onChange={(event) => {
            setInput(
              event.target.value.replace(/[^0-9A-Za-z _-]/g, "").slice(0, 20)
            );
            setUsernameError(null);
          }}
          value={input}
          variant="outlined"
        />
      </InputContainer>
      <FooterContainer>
        <Button
          disabled={!!usernameError || input.length < 3}
          onClick={() => saveUsername(input)}
          variant="contained"
        >
          Begin
        </Button>
      </FooterContainer>
    </>
  );
}

export default function WelcomeModal() {
  const { username, usernameError } = useContext(Context);
  const [input, setInput] = useState("");
  return (
    <Modal
      open={!username}
      onKeyUp={(event) => {
        if (!usernameError && input.length >= 3 && event.key === "Enter")
          saveUsername(input);
      }}
    >
      <Content input={input} setInput={setInput} />
    </Modal>
  );
}
