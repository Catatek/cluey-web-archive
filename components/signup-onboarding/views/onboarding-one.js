import { theme } from "@/theme/styles";
import Image from "next/image";
import styled from "styled-components";
import {
  StyledImg,
  OnboardingTitle,
  OnboardingText,
  OnboardingBtn,
} from "./styles";
import { useFormikContext } from "formik";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.CLUEY_TAN};
  grid-area: container;
`;

const Column = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 90%;
  }
`;

export const OnboardingOne = ({ handleFlowNav }) => {
  const { values } = useFormikContext();
  return (
    <Wrapper>
      <Column>
        <StyledImg>
          <Image
            src="/images/cluey-cloud-icon.png"
            height={70}
            width={70}
            layout="responsive"
            priority
          />
        </StyledImg>
        <OnboardingTitle>
          Help us get to know you a little bit better.
        </OnboardingTitle>
        <OnboardingText style={{ color: theme.CLUEY_DARK_GREEN }}>
          To make the most out of your Cluey experience, we just have a few
          quick questions about your values and who you are as a consumer.
        </OnboardingText>
        <OnboardingBtn onClick={() => handleFlowNav(values)}>
          LET’S GET STARTED!
        </OnboardingBtn>
      </Column>
    </Wrapper>
  );
};
