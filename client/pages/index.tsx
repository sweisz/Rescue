import { useState } from "react";
import styled from "styled-components";
import SafeInput from "../components/SafeInput";

const StyledSubmitButton = styled.button`
  margin: 1em;
  border: none;
  background-color: 0e6d6d;
  padding: 1em;
  border-radius: 1.2em;
  &:hover {
    background: rgb(10, 61, 61);
    color: white;
  }
`;

const Container = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  place-items: center;
  background: #fdc830; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f37335,
    #fdc830
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f37335,
    #fdc830
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const PassName = styled.p`
  background-color: lime;
  border-radius: 1em;
  color: black;
  font-size: 3rem;
  padding: 0.5em 1em;
`;

const Pass = styled.p`
  background-color: black;
  border-radius: 1em;
  color: lime;
  font-size: 3rem;
  padding: 0.5em 1em;
`;

const InputSearch = styled.input`
  border: none;
  padding: 0.9em;
  border-radius: 0.7em;
`;

export default function Home() {
  const [passwordName, setPasswordName] = useState("");
  const [passwordDoc, setPasswordDoc] = useState(null);
  const [secret, setSecret] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await fetch(
      `http://localhost:3333/api/passwords/${passwordName}`
    );
    const passwordDoc = await result.json();
    setPasswordDoc(passwordDoc);
  }
  return (
    <>
      <Container>
        <form onSubmit={(e) => handleSubmit(e)}>
          <InputSearch
            value={passwordName}
            onChange={(event) => setPasswordName(event.target.value)}
          />
          <StyledSubmitButton type="submit">Send request!</StyledSubmitButton>
        </form>
        {passwordDoc && (
          <>
            <PassName> {passwordDoc.name} </PassName>
            <Pass>{passwordDoc.value}</Pass>
          </>
        )}
        <SafeInput
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          type="password"
          placeholder="Enter a password."
        />
      </Container>
    </>
  );
}
