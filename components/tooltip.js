import { theme } from "@/theme/styles";
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.span`
  position: relative;
`;

const Trigger = styled.span`
  display: flex;
  cursor: pointer;
`;

const Bubble = styled.div`
  width: auto;
  height: 29px;
  border-radius: 2px;
  position: absolute;
  top: 100%;
  padding-top: 9px;
  z-index: 1000;
  transform: -10%;
  &::after {
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid ${theme.CLUEY_RED};
    top: 0;
    transform: -10%;
  }
  @media(max-width: 880px){
    transform: translate(${(props) => props.translate || "-10%"}); 
  }
`;

const Message = styled.div`
  height: auto;
  width: ${(props) => props.width || "max-content"};
  max-width: ${(props) => !props.width && "200px"};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #3e3e3e;
  border-radius: 3px;
  color: ${theme.CLUEY_WHITE};
  font-size: 12px;
  font-weight: ${theme.CLUEY_LIGHT};
  font-family: ${theme.CLUEY_INTER};
  display: flex;
  padding: 4px 10px;
  align-items: center;
`;

export const Tooltip = ({ message, children, ...props }) => {
  const [display, setDisplay] = useState(false);
  const { height, width, transform } = props;
  return (
    <Wrapper onMouseLeave={() => setDisplay(false)}>
      {display && (
        <Bubble translate={transform}>
          <Message height={height} width={width}>
            {message}
          </Message>
        </Bubble>
      )}
      <Trigger onMouseOver={() => setDisplay(true)}>{children}</Trigger>
    </Wrapper>
  );
};
