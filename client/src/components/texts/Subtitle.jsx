import styled from "styled-components";

export default styled.span.attrs((props) => ({
  color: props.theme.primaryTextColor,
}))`
  color: ${(props) => props.color};
  text-align: ${(props) => props.textAlign};
  text-overflow: ellipsis;
`;
