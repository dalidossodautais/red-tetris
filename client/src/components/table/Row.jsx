import styled from "styled-components";

export default styled.div.attrs((props) => {
  const added = {};
  added.borderColor = props.theme.primaryTextColor;
  if (props.selected)
    added.backgroundColor = props.theme.primaryBackgroundColor;
  return added;
})`
  border-bottom: 1px solid ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  flex-direction: row;
  width: ${(props) => props.width};
`;
