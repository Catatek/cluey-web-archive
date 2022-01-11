import { theme } from "@/theme/styles";
import styled from "styled-components";

const Div = styled.div`
  display: ${(props) => (props.display ? "none" : "flex")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.background};
  border-radius: ${(props) => props.borderRadius};
  align-items: ${(props) => props.align};
  box-shadow: ${(props) => props.shadow};
  justify-content: ${(props) => props.justify};
  flex-wrap: ${(props) => props.flexWrap};
  gap: ${(props) => props.gap};

  &:hover {
    background-color: ${(props) => props.bgHover};
  }
  &:last-child {
    border-bottom-left-radius: ${(props) => props.borderBottomR};
    border-bottom-right-radius: ${(props) => props.borderBottomL};
  }

  overflow-x: ${(props) => props.overFlowX};
  overflow-y: ${(props) => props.overFlowY};

  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    display: ${(props) => (props.mobileDisplay ? props.mobileDisplay : "flex")};
  }
`;

export const Row = ({ children, ...props }) => {
  const {
    width,
    height,
    background,
    borderRadius,
    margin,
    align,
    shadow,
    justify,
    bgHover,
    borderBottomR,
    borderBottomL,
    flexWrap,
    gap,
    overFlowX,
    overFlowY,
    display,
    mobileDisplay,
  } = props;
  return (
    <Div
      width={width}
      height={height}
      align={align}
      borderRadius={borderRadius}
      margin={margin}
      shadow={shadow}
      background={background}
      justify={justify}
      bgHover={bgHover}
      borderBottomR={borderBottomR}
      borderBottomL={borderBottomL}
      flexWrap={flexWrap}
      gap={gap}
      overFlowX={overFlowX}
      overFlowY={overFlowY}
      display={display}
      mobileDisplay={mobileDisplay}
    >
      {children}
    </Div>
  );
};
