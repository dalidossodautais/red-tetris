import styled from "styled-components";

export default styled.div.attrs((props) => {
  const added = {
    color: props.theme.primaryTextColor,
  };
  return added;
})`
  align-items: center;
  color: ${(props) => props.color};
  display: flex;
  font-size: 15px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: ${(props) => props.fontWeight};
  height: 35px;
  line-height: 35px;
  margin: 10px;
  text-align: center;
  width: ${(props) => props.width};
`;
