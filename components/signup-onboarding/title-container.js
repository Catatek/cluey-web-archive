import { TitleBase } from "@/theme/index";
import Image from "next/image";
import styled from "styled-components";
import { theme } from "@/theme/styles";

const Text = styled.p`
  font-family: ${theme.CLUEY_INTER};
  font-size: 16px;
  color: ${theme.CLUEY_DARK_GREEN};
  text-align: center;
  margin: 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  margin-bottom: ${({ marginBottom }) => marginBottom && "22px"};
`;

export const TitleContainer = ({ src, title, text, marginBottom }) => (
  <Wrapper marginBottom={marginBottom}>
    <Image src={src} width={70} height={70} priority />
    <TitleBase
      spacing
      style={{ maxWidth: 450, textAlign: "center", margin: "20 0 0 0" }}
    >
      {title}
    </TitleBase>
    {text && <Text>{text}</Text>}
  </Wrapper>
);
