import { TextBase } from "@/theme/index";
import { theme } from "@/theme/styles";
import styled from "styled-components";

const Label = styled(TextBase)`
  font-size: 12px;
  font-weight: ${theme.CLUEY_LIGHT};
  color: ${theme.CLUEY_PURE_RED};
  width: 390px;
  position: relative;
`;

export const LabelError = ({ children }) => {
  return <Label>{children}</Label>;
};
