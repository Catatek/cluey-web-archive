import styled, { css } from "styled-components";
import { theme } from "./styles";

// FONTS
export const BaseFont = css`
  font-weight: ${theme.CLUEY_BOLD};
  letter-spacing: -0.42px;
  color: ${(props) =>
    props.white ? theme.CLUEY_WHITE : theme.CLUEY_DARK_GREEN};
`

export const TitleBase = styled.h1`
  ${BaseFont}
  font-family: ${theme.CLUEY_TEST_FINANCIER_DISPLAY};
  font-size: 42px;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 34px;
    letter-spacing: ${(props) => (props.spacing ? "-0.34px" : "-0.42px")};
  }
  @media (max-width: ${theme.CLUEY_SIZE_FULL_MOBILE}) {
    font-size: 24px;
  }
`;

export const SubtitleBase = styled.h2`
  font-weight: ${theme.CLUEY_SEMI_BOLD};
  ${BaseFont}
  font-family: ${(props) => (props.landing ? theme.CLUEY_TEST_FINANCIER_DISPLAY : theme.CLUEY_INTER)};
  text-align: left;
  font-size: ${(props) => (props.size ? "25px" : "42px")};
  margin: ${(props) => props.margin || "5px 0"};
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: ${(props) => (props.size ? "28px" : "33px")};
    line-height: 1;
    letter-spacing: -0.34px;
  }
`;

export const NavLink = styled.a`
  font-size: 12px;
  font-family: ${theme.CLUEY_INTER};
  font-weight: ${theme.CLUEY_BOLD};
  letter-spacing: 0.7px;
  color: ${(props) =>
    props.white ? theme.CLUEY_WHITE : theme.CLUEY_DARK_GREEN};
  text-transform: uppercase;
  margin-right: ${(props) => (props.marginRight ? "20px" : "0px")};
  cursor: pointer;
  cursor: hand;
  @media (max-width: ${theme.CLUEY_SIZE_EXTRA_LARGE_SCREEN}) {
    ${(props) =>
    props.mobileLink &&
    css`
        font-size: 10px;
        margin-right: ${(props) => props.marginRight && "20px"};
      `}
  }
  @media (max-width: ${theme.CLUEY_SIZE_LARGE_SCREEN}) {
    ${(props) =>
    props.mobileLink &&
    css`
        margin-right: ${(props) => props.marginRight && "10px"};
      `}
  }

  @media (max-width: ${theme.CLUEY_SIZE_SMALL_SCREEN}) {
    ${(props) =>
    props.mobileLink &&
    css`
        margin-right: ${(props) => props.marginRight && "5px"};
      `}
  }
`;

export const TextBase = styled.p`
  font-family: ${theme.CLUEY_INTER};
  font-size: 16px;
  margin: ${(props) => props.margin || "5px 0"};
  line-height: 1.45;
  text-align: left;
  max-width: 550px;
  color: ${(props) =>
    props.white ? theme.CLUEY_WHITE : theme.CLUEY_DARK_GREEN};
  @media (max-width: ${theme.CLUEY_SIZE_BREAK_POINT}) {
    ${(props) =>
    props.cardText &&
    css`
        font-size: 13px;
        text-align: left;
      `}
    ${(props) =>
    props.center &&
    css`
        text-align: center;
      `}
  }

  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 95% !important;
    flex-grow: 0;
    text-align: left;
    color: ${(props) =>
    props.white ? theme.CLUEY_WHITE : theme.CLUEY_DARK_GREEN};
    ${(props) =>
    props.cardText &&
    css`
        font-size: 13px;
        text-align: left;
      `}
    ${(props) =>
    props.center &&
    css`
        text-align: center;
      `}
  }
`;

// FORMS

export const Input = styled.input`
  width: ${(props) => (props.small ? "400px" : "485px")};
  height: 48px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  font-family: ${theme.CLUEY_INTER};
  border: ${(props) =>
    props.error ? "1px solid red" : `solid 1px ${theme.CLUEY_DARK_GREEN}`};
  padding-left: 20px;
  ::placeholder {
    color: ${theme.CLUEY_LIGHT_GREY};
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 450px) {
    width: 100% !important;
  }

  @media (max-width: ${theme.CLUEY_SIZE_FULL_MOBILE}) {
    width: 100%;
    height: 45px;
    margin-right: 0px !important;
    box-sizing: border-box;
    display: ${(props) => (props.display ? "none" : "inline")};
  }
`;

export const Button = styled.button`
  width: ${(props) => (props.large ? "220px" : "158px")};
  height: 49px;
  border-radius: 12px;
  border: 1px solid transparent;
  font-family: ${theme.CLUEY_INTER};
  font-size: 14px;
  font-weight: ${theme.CLUEY_SEMI_BOLD};
  text-align: center;
  color: ${theme.CLUEY_WHITE};
  text-transform: uppercase;
  &:disabled {
    background-color: ${theme.CLUEY_LIGHT_GREEN};
  }
  cursor: pointer;
  cursor: hand;
  background: ${(props) =>
    props.light ? `${theme.CLUEY_LIGHT_GREEN}` : `${theme.CLUEY_DARK_GREEN}`};
  @media (max-width: ${theme.CLUEY_SIZE_BREAK_POINT}) {
    width: ${(props) => props.mobile};
  }
  @media (max-width: 1080px) {
    ${(props) =>
    props.splashMobileBtn &&
    css`
        width: 100% !important;
        margin-top: 20px;
      `}
  }
  @media (max-width: ${theme.CLUEY_SIZE_FULL_MOBILE}) {
    margin: ${(props) => (props.margin ? "20px 0px" : "0 ")};
    width: ${(props) => props.widthMobile};
  }
`;

// MARKDOWN/RICH-TEXT

export const PostBody = styled.div`
  width: 80%;
  max-width: 1000px;
  height: auto;
  padding: 60px;
  border-radius: 12px;
  border: solid 1px ${theme.CLUEY_PASTEL_BLUE};
  background-color: ${theme.CLUEY_WHITE};
  margin: 0 auto;
  margin-bottom: 60px;
  box-sizing: border-box;
  @media (max-width: 500px) {
    width: 90%;
    padding: 20px;
  }
`;

export const PostTitleBase = styled.h2`
  font-family: Inter;
  font-size: 28px;
  font-weight: bold;
  color: ${theme.CLUEY_DARK_GREEN};
  margin: 0;
`;

export const PostAuthor = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  color: #b9babd;
  margin-top: 16px;
`;

export const PostMarkup = styled.div`
  line-height: 1.75;
  font-family: Inter;
  h1 {
    font-size: 24px;
    font-weight: 600;
    color: ${theme.CLUEY_BLACK};
    font-family: Inter;
  }
  h2 {
    font-size: 22px;
    font-weight: 600;
    color: ${theme.CLUEY_DARK};
    font-family: Inter;
  }
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: ${theme.CLUEY_DARK};
    font-family: Inter;
  }
  p {
    font-size: 16px;
    font-weight: 400;
    color: ${theme.CLUEY_DARK};
    font-family: Inter;
  }
  img {
    max-width: 500px;
  }
`;

// MISC

export const Tag = styled.div`
  font-size: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  margin: 4px;
  display: inline-block;
  font-family: ${theme.CLUEY_INTER};
  font-weight: ${theme.CLUEY_BOLD};
  background-color: ${({ backgroundColor }) => backgroundColor};
  text-transform: uppercase;
  color: ${({ white }) => (white ? `${theme.CLUEY_WHITE}` : `${theme.CLUEY_BLACK}`)};
`;

export const WrapperBase = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;