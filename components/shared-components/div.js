import styled from "styled-components";

const StyledDiv = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  max-width: ${(props) => props.maxWidth};
`;

export const Div = ({ children, ...props }) => {
  const { width, height, margin, padding, border, borderRadius, maxWidth } =
    props;

  return (
    <StyledDiv
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      border={border}
      borderRadius={borderRadius}
      maxWidth={maxWidth}
    >
      {children}
    </StyledDiv>
  );
};
