import styled from "styled-components";
import { theme } from "@/theme/styles";

const Div = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    flex-direction: column;
    height: 0;
  }
`;

export const Container = ({ children }) => {
  return <Div>{children}</Div>;
};
