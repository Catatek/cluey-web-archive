import Image from "next/image";
import styled from "styled-components";
import { Row, OutlineNavBtn } from "@/shared-components";
import { theme } from "@/theme/styles";
import { useRouter } from "next/router";
import { TitleBase, TextBase as TextBase } from "@/theme/index";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px 0;
  width: 95%;
  height: auto;
  box-sizing: border-box;
`;

const Div = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  height: 60px;
  border-bottom: 3px solid transparent;
  ${({ linkActive }) =>
    linkActive &&
    `
    border-bottom: 3px solid ${theme.CLUEY_DARK_GREEN};
  `}
`;

const Title = styled(TitleBase)`
  font-family: ${theme.CLUEY_INTER};
  font-weight: ${theme.CLUEY_SEMI_BOLD};
  font-size: 18px;
  margin: 0px 0px 0px 15px;
`

const Text = styled(TextBase)`
  font-size: 18px;
  margin: 0px 0px 0px 10px;
  font-weight: ${theme.CLUEY_NORMAL};
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 15px;
  }
`

export const TabNav = () => {
  const router = useRouter();
  return (
    <Container>
      <Row align={"center"}>
        <OutlineNavBtn src={"/dashboard"}>
          <Image
            src="/images/cluey-chevron-left-green.svg"
            alt="Picture of the author"
            width={12}
            height={12}
            layout="intrinsic"
            priority
          />
        </OutlineNavBtn>
        <Title>
          My Reactions
        </Title>
      </Row>

      <Row justify={"center"} align={"center"} margin={"0 0 10px 0"}>
        <Div
          linkActive={router.pathname.includes("my-likes")}
          onClick={() => router.push("/my-reactions/my-likes")}
        >
          <Image src="/images/thumbsup.png" width={24} height={24} priority />
          <Text>
            My Likes
          </Text>
        </Div>
        <Div
          linkActive={router.pathname.includes("my-dislikes")}
          onClick={() => router.push("/my-reactions/my-dislikes")}
        >
          <Image src="/images/thumbsdown.png" width={24} height={24} priority />
          <Text>
            My Dislikes
          </Text>
        </Div>
      </Row>
    </Container>
  );
};
