import styled from "styled-components";

type Props = {
  value: string;
};

function calcColor(length: number): string {
  return `hsl(${Math.min(length * 12, 120)},100%,50%)`;
}

const SafeInput = styled.input<Props>`
  background: ${(props) => calcColor(props.value.length)};
  padding: 0.9em;
  border: 2px solid white;
  border-radius: 0.7em;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #ffffff;
  }
`;

export default SafeInput;
