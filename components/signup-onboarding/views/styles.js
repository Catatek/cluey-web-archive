import styled, { css } from "styled-components";
import { theme } from "@/theme/styles";
import { TitleBase, Button } from "@/theme/index";
import { Field } from "formik";

export const OnboardingTitle = styled(TitleBase)`
  font-size: 40px;
  text-align: center;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 34px;
    letter-spacing: -0.34px;
    margin-bottom: 0px;
  }
`;

export const OnboardingText = styled.p`
  margin: 21px 0px 40px 0px;
  font-family: ${theme.CLUEY_INTER};
  font-size: 18px;
  line-height: 1.56;
  letter-spacing: -0.18px;
  text-align: center;
  color: ${(props) => props.color};
  ${(props) =>
    props.text &&
    css`
      font-size: 16px;
      line-height: 1.56;
      letter-spacing: -0.18px;
      text-align: center;
      color: ${theme.CLUEY_DARK_GREEN};
      margin: 0;
    `}
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: -0.16px;
  }
`;

export const OnboardingBtn = styled(Button)`
  width: 200px;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 180px;
    height: 44.3px;
  }
`;

export const StyledImg = styled.div`
  height: 70px;
  width: 70px;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    height: 60px;
    width: 60px;
  }
`;

export const Input = styled(Field)`
  width: 430px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.error ? `${theme.CLUEY_PURE_RED}` : `${theme.CLUEY_DARK_GREEN}`};
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 1.3rem;
  background-color: transparent;
  font-family: ${theme.CLUEY_INTER};
  letter-spacing: -0.2px;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  ::placeholder {
    color: ${theme.CLUEY_DARK_GREY};
    font-size: 1.3rem;
    text-align: center;
    font-family: ${theme.CLUEY_INTER};
  }
  &:focus {
    outline: none;
  }
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 300px;
    font-size: 1rem;
    ::placeholder {
      font-size: 1rem;
      margin: 50px;
    }
  }
`;

export const Select = styled.select`
  width: 430px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.error ? `${theme.CLUEY_PURE_RED}` : `${theme.CLUEY_DARK_GREEN}`};
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 1.3rem;
  background-color: ${theme.CLUEY_TAN};
  font-family: ${theme.CLUEY_INTER};
  letter-spacing: -0.2px;
  text-align: center;
  padding: 20px;
  background: url("/images/cluey-chevron-down.svg") ${theme.CLUEY_TAN} no-repeat
    98.5% !important;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-align-last: center;
  &:focus {
    outline: none;
  }
  &:invalid {
    color: ${theme.CLUEY_LIGHT_GREY};
  }

  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 300px;
    font-size: 1rem;
    ::placeholder {
      font-size: 1rem;
      margin: 50px;
    }
  }
`;

export const Option = styled.option`
  color: ${theme.CLUEY_DARK};
  background-color: ${theme.CLUEY_TAN};
  font-size: 1.3rem;
  &:first-child {
    color: ${theme.CLUEY_GREY} !important;
  }
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 1rem;
  }
`;

export const Error = styled.div`
  font-family: ${theme.CLUEY_INTER};
  color: ${theme.CLUEY_RED};
  margin-top: 10px;
`;
