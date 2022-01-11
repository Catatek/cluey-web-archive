import styled, { css } from "styled-components";
import { theme } from "@/theme/styles";
import { TitleBase, SubtitleBase } from "@/theme/index";

export const StyledTitle = styled(TitleBase)`
  margin: 0px;
  font-size: 34px;
  font-weight: ${theme.CLUEY_BOLD};
  letter-spacing: -0.34px;
  text-align: left;
`;

export const StyledSubtitle = styled(SubtitleBase)`
  font-size: ${(props) => (props.small ? "16px" : "18px")};
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: -0.18px;
  text-align: left;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE_LG}) {
    font-size: 14px;
  }
  ${(props) =>
    props.dropdown &&
    css`
      width: 100%;
      display: flex;
    `}
`;

export const Line = styled.div`
  width: 100%;
  background-color: ${theme.CLUEY_GRAY};
  height: 1px;
  margin: 16px 0px;
  margin: ${(props) => props.margin};
  display: ${(props) => (props.notActive ? "none" : "block")};
  ${(props) =>
    props.vertical &&
    css`
      margin: 0px 0px;
      position: relative;
      background-color: ${theme.CLUEY_GRAY};
      width: 1px;
      height: 16px;
      flex-grow: 0;
      margin-left: 10%;
    `}
`;

export const DropDown = styled.div`
  width: 100%;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
`;

export const DropDownContent = styled.div`
  width: 100%;
  height: 100%;
  display: ${({ show }) => (show ? `block` : `none`)};
  min-width: 160px;
  z-index: 0;
  ${(props) =>
    props.right &&
    css`
      z-index: 1;
      width: 220px;
      padding: 10px;
      height: auto;
      max-height: 400px;
      position: absolute;
      right: 0;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);
      background-color: ${theme.CLUEY_APPROX_WHITE};
      border-radius: 5px;
      margin-right: 120px;
      margin-top: 30px;
      overflow: auto;
      ::-webkit-scrollbar {
        display: none;
      }
    `}
`;
