import { theme } from "@/theme/styles";
import styled, { css } from "styled-components";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

export const StyledCheckbox = styled(Checkbox)`
  & .MuiIconButton-label {
    color: ${theme.CLUEY_DARK_GREEN};
  }
  & .Mui-checked {
    color: ${theme.CLUEY_DARK_GREEN};
  }
`;

export const StyledSelect = styled(Select)`
  &:focus-within {
    background-color: transparent;
    opacity: 0;
  }
  &.MuiInputBase-root {
    position: absolute;
    width: 200px;
    border-radius: 20px;
    color: transparent;
    background-color: transparent;
  }
  & .MuiSvgIcon-root {
    visibility: hidden;
  }

  & .MuiSelect-icon {
    visibility: hidden;
  }

  &.MuiInput-underline {
    border-bottom: none;
    content: none;
    &:before {
      border-bottom: none;
      content: none;
    }
    &:after {
      border-bottom: none;
      content: none;
    }
  }
`;
export const ImgContainer = styled.div`
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

export const BrandWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 55px;
  width: 100%;
`;

export const TriggerBtn = styled.button`
  width: 130px;
  margin: 0 20px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 36px;
  border: ${(props) =>
    props.border
      ? `solid 1.6px ${theme.CLUEY_DARK_GREY}`
      : ` solid 1.6px ${theme.CLUEY_DARK_GREY}`};
  color: ${theme.CLUEY_DARK_GREY};
  background: ${theme.CLUEY_WHITE};
  font-family: ${theme.CLUEY_INTER};
  font-size: 13px;
  line-height: 0.98;
  letter-spacing: -0.13px;
  font-weight: ${theme.CLUEY_SEMI_BOLD};
  cursor: pointer;
  &:hover {
    background-color: ${theme.CLUEY_GRAY};
  }
`;

export const InputContainer = styled.div`
  background-color: ${theme.CLUEY_WHITE};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  outline: none;
  border-radius: 12px;
  position: relative;
  font-family: ${theme.CLUEY_INTER};
  border: solid 1px ${theme.CLUEY_DARK_GREEN};
  transition: 250ms;
  ${(props) =>
    props.borderBottom &&
    css`
      border-bottom: none;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    `}
  &:focus {
    outline: none;
  }
`;

export const Input = styled.input`
  font-family: Helvetica, "FontAwesome", sans-serif;
  font-size: inherit;
  background-color: transparent;
  padding-left: 12px;
  width: 100%;
  border: 0;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: ${theme.CLUEY_LIGHT_GREY};
    font-size: 14px;
  }
  @media (max-width: 890px) {
    padding-left: 0px;
    ::placeholder {
      font-size: 10px;
    }
  }
`;
export const DropDownContent = styled.div`
  display: ${({ show }) => show && "flex"};
  position: absolute;
  width: 100%;
  border: solid 1px ${theme.CLUEY_DARK_GREEN};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  max-height: 300px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 5;
  margin: 0 auto;
  flex-direction: column;
  background: ${theme.CLUEY_WHITE};
  overflow-y: scroll;
  scrollbar-width: none;
  overflow-x: hidden;
  box-sizing: border-box;
`;
