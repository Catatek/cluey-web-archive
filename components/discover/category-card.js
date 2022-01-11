import Image from "next/image";
import { theme } from "@/theme/styles";
import styled from "styled-components";
// import { Text } from "@/shared-components";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px ${theme.CLUEY_LIGHT_SHADE_RED};
  background-color: #fbfbfb;
  flex-direction: column;
  padding: 30px 60px;
  cursor: pointer;
  transition: 250ms;
  box-sizing: border-box;
  &:hover {
    background-color: ${theme.CLUEY_WHITE_SMOKE};
  }
  ${({ disabled }) =>
    disabled &&
    `
    background-color: ${theme.CLUEY_WHITE_SMOKE};
    &:hover {
      background-color: ${theme.CLUEY_WHITE_SMOKE};
      cursor: default;
    }
  `}
  @media (max-width: 543px) {
    width: 100%;
  }
`;

const ImgContainer = styled.div`
  width: 120px;
  border-radius: 50%;
  height: 120px;
  box-shadow: 0 2px 18px -3px rgba(0, 0, 0, 0.25);
  background-color: ${theme.CLUEY_WHITE};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  font-family: ${theme.CLUEY_INTER};
  margin: 15px 0 0 0;
  font-size: 15px;
  letter-spacing: -0.15px;
  line-height: 1.4;
  text-align: center;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 160;
  }
  @media (max-width: 543px) {
    width: 160;
  }
`

export const CategoryCard = ({ title, img, id }) => {

  const router = useRouter();
  return (
    <Wrapper>
      <Container onClick={() => router.push(`/category/${id}`)}>
        <ImgContainer>
          <Image src={img} height={60} width={60} />
        </ImgContainer>
      </Container>
      <Text>
        {title}
      </Text>
    </Wrapper>
  );
};
