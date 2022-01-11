import { theme } from "@/theme/styles";
import styled from "styled-components";

const Div = styled.div`
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 36.4px;
  border: solid 1.6px transparent;
  transition: 250ms;
  border: ${(props) =>
    props.border
      ? ` solid 1.6px ${props.border}`
      : ` solid 1.6px ${theme.CLUEY_DARK_GREY}`};
  color: ${(props) => (props.color ? props.color : `${theme.CLUEY_DARK_GREY}`)};
  background: ${(props) => props.bgColor};
  font-family: ${theme.CLUEY_INTER};
  font-size: 13px;
  line-height: 0.98;
  letter-spacing: -0.13px;
  font-weight: ${theme.CLUEY_SEMI_BOLD};
  &:hover {
    background-color: ${(props) => props.hooverColor};
  }
  cursor: pointer;
  cursor: hand;
`;

export const OutlineBtn = ({
  children,
  handleAction,
  handleRemoveBrand,
  ...props
}) => {
  const {
    width,
    margin,
    border,
    color,
    bgColor,
    height,
    type,
    handleUserReaction,
    reactionType,
  } = props;
  return (
    <>
      {type === "addRemove" ? (
        <>
          <Div
            border={border}
            color={color}
            bgColor={bgColor}
            width={width}
            margin={margin}
            height={height}
          >
            {children}
          </Div>
        </>
      ) : (
        <>
          <Div
            hooverColor={`${theme.CLUEY_GRAY_HOVER}`}
            width={width}
            margin={margin}
            height={height}
            bgColor={bgColor}
            border={border}
            onClick={() => handleUserReaction(reactionType)}
          >
            {children}
          </Div>
        </>
      )}
    </>
  );
};
