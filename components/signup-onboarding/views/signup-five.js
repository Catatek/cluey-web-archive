import styled from "styled-components";
import { TitleBase, TextBase, Button } from "@/theme/index";
import { theme } from "@/theme/styles";
import { BrandCard, BrandSummary } from "@/components";
import { useRouter } from "next/router";
import { useFormikContext } from "formik";
import { useGetUserFootprint, useGetUserPortfolio } from "@/queries";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.CLUEY_NEON_GREEN};
  grid-area: container;
`;

const Container = styled.div`
  width: 70%;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  margin-top: 60px;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 90%;
  }
`;

const SignupTitle = styled(TitleBase)`
  width: 100%;
  font-size: 40px;
  letter-spacing: -0.4px;
  font-weight: ${theme.CLUEY_BOLD};
  text-align: ${(props) => (props.center ? "center" : "left")};
  margin: ${(props) => props.margin};
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 34px;
  }
`;

const SignupText = styled(TextBase)`
  text-align: center;
  font-size: 18px;
`;

const BrandTitle = styled.h2`
  font-family: ${theme.CLUEY_INTER};
  font-size: 26px;
  font-weight: ${theme.CLUEY_LIGHT};
  letter-spacing: -0.26px;
  text-align: left;
  color: ${theme.CLUEY_SEMI_DARK_GREEN};
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 22px;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 24px 0;
  background-color: ${theme.CLUEY_GRAY};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.center ? "center" : "flex-start")};
`;

const BrandsWrapper = styled.div`
  border-radius: 20px;
  width: 100%;
  background-color: ${theme.CLUEY_WHITE};
  padding: ${(props) => (props.averageImpact ? "40px 5px" : "5px")};
  box-shadow: ${(props) =>
    props.averageImpact && "0 4px 15px 0 rgba(0, 0, 0, 0.18)"};
  box-sizing: border-box;
`;

const CardContainer = styled.div`
  width: 95%;
  margin: auto;
  display: flex;
  flex-direction: column;
  @media (max-width: ${theme.CLUEY_SIZE_BREAK_POINT}) {
    width: 90%;
  }
`;

const AvgCard = ({ impactType }) => {
  const { data, isValidating } = useGetUserFootprint();

  const userFootprint = !isValidating && data?.userFootprint;

  return (
    <BrandsWrapper averageImpact>
      <CardContainer>
        <SignupTitle margin="0">Average Impact</SignupTitle>
        <BrandTitle style={{ marginTop: 10 }}>{impactType}</BrandTitle>
        <TextBase cardText>
          Here’s a summary of the average people, planet, and political impacts
          of the brands you chose.
        </TextBase>
        <Line />
        <BrandSummary
          type="currentFootprint"
          planetImpact={userFootprint.planet_impact}
          peopleImpact={userFootprint.people_impact}
          politicalImpact={userFootprint.political_impact}
        />
      </CardContainer>
    </BrandsWrapper>
  );
};

export const SignupFive = () => {
  const router = useRouter();
  const { values } = useFormikContext();
  const impactType = values.brandsImpact.name;
  const { data, isValidating } = useGetUserPortfolio({
    withCategories: false,
  });

  const portfolio = !isValidating && data?.userPortfolio;

  return (
    <Wrapper>
      <Container>
        <SignupTitle margin="0 0 40px" center>
          You’re one step closer to being a more informed consumer!
        </SignupTitle>
        <AvgCard impactType={impactType} portfolio={portfolio} />
        <Column center>
          <SignupTitle margin="60px 0px 20px" center>
            Want to know how you can do better?
          </SignupTitle>
          <SignupText style={{ marginBottom: 40 }}>
            Answer a few more questions about your values, see how the rest of
            the brands in your home add up, and start making conscious swaps.
          </SignupText>
          <Button
            style={{ marginBottom: 60 }}
            onClick={() => router.push("/onboarding")}
          >
            LET’S DO IT!
          </Button>
        </Column>
        <BrandsWrapper>
          <CardContainer>
            <SignupTitle margin="60px 0 0">Brand Impact</SignupTitle>
            <BrandTitle style={{ marginTop: 10 }}>{impactType}</BrandTitle>
            <TextBase cardText style={{ marginBottom: 22 }}>
              Here are the people, planet, and political impacts broken down by
              the brands you chose.
            </TextBase>
            {portfolio &&
              portfolio.length > 0 &&
              portfolio.map((key, index) => {
                return (
                  <BrandCard
                    key={index}
                    brandData={key}
                    showReactionsActions={false}
                  />
                );
              })}
          </CardContainer>
        </BrandsWrapper>

        <Column center>
          <Button
            style={{ margin: "60px 0px 100px 0px" }}
            onClick={() => router.push("/onboarding")}
          >
            NEXT
          </Button>
        </Column>
      </Container>
    </Wrapper>
  );
};
