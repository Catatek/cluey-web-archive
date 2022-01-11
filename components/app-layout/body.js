import styled from "styled-components";
import { theme } from "@/theme/styles";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  border-left: 1px solid ${theme.CLUEY_LIGHT_SHADE_RED};
  border-right: 1px solid ${theme.CLUEY_LIGHT_SHADE_RED};
  grid-area: body;
  overflow-y: auto;
  overflow-x: hidden;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE_LG}) {
    border-right: 0px;
  }
`;

export const Body = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
