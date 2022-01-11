import styled, { css } from "styled-components";
import { theme } from "@/theme/styles";

export const SettingTitle = styled.h2`
  font-family: ${theme.CLUEY_INTER};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.18px;
  text-align: left;

  color: ${theme.CLUEY_DARK_GREEN};
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    display: ${(props) => props.MDisplay};
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.CLUEY_GRAY};
  margin: ${(props) => props.margin};
`;

export const Label = styled.label`
  margin: 15px 0px;
  font-family: ${theme.CLUEY_INTER};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.16px;
  text-align: left;
  color: ${theme.CLUEY_DARK};
  max-width: 440px;
  ${(props) =>
    props.small &&
    css`
      width: 324px;
      height: 34px;
      font-size: 12px;
      letter-spacing: -0.12px;
      text-align: left;
      color: ${theme.CLUEY_MEDIUM_GREY};
    `}
  ${(props) =>
    props.Subtitle &&
    css`
      max-width: 550px;
      margin: 10px 0px;
    `}

@media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    ${(props) =>
      props.Subtitle &&
      css`
        max-width: 300px;
        margin: 10px 0px;
      `}
  }
`;
