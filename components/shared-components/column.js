import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  margin: ${(props) => props.margin};
`;

export const Column = ({ children, ...props }) => {
  const { width, height, align, justify, margin } = props;

  return (
    <Div
      width={width}
      height={height}
      align={align}
      justify={justify}
      margin={margin}
    >
      {children}
    </Div>
  );
};
