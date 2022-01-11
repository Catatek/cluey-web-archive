import styled from "styled-components";

const Div = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  border: ${(props) => props.border};
  background: ${(props) => props.bgImage};
  margin: ${(props) => props.margin};
  opacity: ${(props) => props.opacity};
  cursor: ${(props) => props.cursor};
  min-width: ${(props) => props.minWidth};
`;

export const StyledImg = ({ children, ...props }) => {
  const {
    width,
    height,
    border,
    borderRadius,
    bgImage,
    margin,
    opacity,
    cursor,
    minWidth,
  } = props;

  return (
    <Div
      width={width}
      height={height}
      border={border}
      borderRadius={borderRadius}
      bgImage={bgImage}
      margin={margin}
      opacity={opacity}
      cursor={cursor}
      minWidth={minWidth}
    >
      {children}
    </Div>
  );
};
