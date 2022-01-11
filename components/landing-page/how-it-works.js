import Image from "next/image";
import styled from "styled-components";
import { theme } from "@/theme/styles";
import { Button, SubtitleBase, TextBase } from "@/theme/index";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  width: 100%;
  padding: 48px 0;
  background-color: ${theme.CLUEY_NEON_GREEN};
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Subtitle = styled(SubtitleBase)`
  font-family: ${theme.CLUEY_TEST_FINANCIER_DISPLAY};
  font-size: 42px;
  letter-spacing: 'normal';
  margin-left: 13px;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 33px;
  }
`

const Grid = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-template-rows: auto;
  grid-gap: 60px;

  @media (min-width: ${theme.CLUEY_SIZE_LARGE_SCREEN}) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
  }

  @media (max-width: 720px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 30px;
  }
`;

const StepWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Circle = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 20px -3px rgba(0, 0, 0, 0.25);
  background-color: ${theme.CLUEY_WHITE};
`;

const StepSubtitle = styled.h2`
  font-weight: ${theme.CLUEY_SEMI_BOLD};
  line-height: 1.3;
  text-align: center;
  font-family: ${theme.CLUEY_INTER};
  color: ${theme.CLUEY_DARK_GREEN};
  width: 260px;
  height: 78px;
  margin-bottom: 14px;
  height: 78px;
  width: 260px;
  @media (min-width: ${theme.CLUEY_SIZE_EXTRA_LARGE_SCREEN}) {
    font-size: 24px!important;
    width: 14rem!important;
  }
  @media (min-width: ${theme.CLUEY_SIZE_LARGE_SCREEN}) {
    font-size: 20px;
    width: 12rem;
  }
`;

const StepText = styled(TextBase)`
  margin: 0;
  font-weight: ${theme.CLUEY_LIGHT};
`

const Step = ({ src, title, body }) => (
  <StepWrapper>
    <Circle>
      <Image src={src} height={28} width={28} alt="Your Name" />
    </Circle>
    <StepSubtitle>{title}</StepSubtitle>
    <StepText center>
      {body}
    </StepText>
  </StepWrapper>
);

const StepperWrapper = styled.div`
  width: 65%;
  height: 31px;
  margin: 0 0 60px 0;
  display: flex;
  justify-content: space-between;
  position: relative;
  @media (max-width: ${theme.CLUEY_SIZE_LARGE_SCREEN}) {
    display: none;
  }
`;

const Elipsis = styled.div`
  width: 31px;
  height: 31px;
  border: solid 1.1px ${theme.CLUEY_DARK_GREEN};
  border-radius: 50%;
  background-color: ${theme.CLUEY_DARK_GREEN};
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
  font-family: ${theme.CLUEY_INTER};
  font-size: 12px;
  color: ${theme.CLUEY_WHITE};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Line = styled.div`
  width: 97%;
  height: 1px;
  margin: 14.5px 16px 15.5px 12px;
  background-color: ${theme.CLUEY_DARK_GREEN};
  position: absolute;
`;

const howItWorksArr = [
  {
    src: `/images/how-it-works-profile-icon.png`,
    title: "Add Your Household Brands",
    body: "Create your profile by adding the brands you buy and the values you care most about.",
  },
  {
    src: `/images/how-it-works-eyes-icon.png`,
    title: "Discover Your Impact",
    body: "See how your brand impacts add up, and make changes based on your values.",
  },
  {
    src: `/images/how-it-works-thumbs-icon.png`,
    title: "Tell Brands How You Feel",
    body: "Influence change by adding your voice alongside others, and we make sure brands hear you.",
  },
  {
    src: `/images/how-it-works-cluey-icon.png`,
    title: "Download the Browser Extension",
    body: "Keep discovering impacts and adding brands as you surf the web.",
  },
];

export const HowItWorks = () => {
  const router = useRouter()
  return (
    <Wrapper>
      <Container>
        <Row style={{ marginBottom: 25 }}>
          <Image
            src="/images/cluey-search.png"
            height={30}
            width={30}
            alt="Your Name"
          />
          <Subtitle> How It Works</Subtitle>
        </Row>
        <Grid>
          {howItWorksArr.map((key, index) => {
            return (
              <Step
                key={index}
                src={key.src}
                title={key.title}
                body={key.body}
              />
            );
          })}
        </Grid>
        <StepperWrapper>
          <Elipsis>1</Elipsis>
          <Elipsis>2</Elipsis>
          <Elipsis>3</Elipsis>
          <Elipsis>4</Elipsis>
          <Line></Line>
        </StepperWrapper>
        <Button onClick={() => router.push("/signup")}>SEE MY IMPACT</Button>
      </Container>
    </Wrapper>
  );
};
