import styled from "styled-components";
import Toolbar from "@material-ui/core/Toolbar";

export default styled(Toolbar).attrs((props) => ({
  backgroundcolor: props.theme.primaryBackgroundColor,
}))`
  background-color: ${(props) => props.backgroundcolor};
  margin-bottom: ${(props) => props.marginbottom};
`;
