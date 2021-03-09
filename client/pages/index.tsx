import { useState } from "react";
import styled from "styled-components";

const StyledSubmitButton = styled.button`
  color: red;
`;

const Container = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  place-items: center;
  /* justify-items: center;
  align-items: center; */
`;

const PassName = styled.p`
  background-color: lime;
  color: black;
  font-size: 3rem;
  padding: 1em;
`;

const Pass = styled.p`
  background-color: black;
  color: lime;
  font-size: 3rem;
  padding: 1em;
`;

export default function Home() {
  const [passwordName, setPasswordName] = useState("");
  const [passwordDoc, setPasswordDoc] = useState(null);

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
          <input
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
        <input type="password" />
      </Container>
    </>
  );
}
