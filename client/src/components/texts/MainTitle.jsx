import styled from "styled-components";

export default styled.h1.attrs((props) => ({
  color: props.theme.primaryTextColor,
}))`
  color: ${(props) => props.color};
  text-overflow: ellipsis;
`;
