import styled from "styled-components";

export default styled.h2.attrs((props) => ({
  color: props.theme.primaryTextColor,
}))`
  color: ${(props) => props.color};
  fontweight: ${(props) => props.fontWeight};
  text-overflow: ellipsis;
`;
