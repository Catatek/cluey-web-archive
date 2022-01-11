import styled from "styled-components";
import { theme } from "@/theme/styles";

const Div = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.CLUEY_TAN};
`;

export const Wrapper = ({ children }) => {
  return <Div>{children}</Div>;
};
