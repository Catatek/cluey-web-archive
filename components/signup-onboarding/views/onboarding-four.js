import { theme } from "@/theme/styles";
import { Tooltip } from "components/tooltip";
import Image from "next/image";
import styled from "styled-components";
import { ImportanceInput } from "../importance-input";
import { StyledImg } from "@/shared-components";
import { OnboardingTitle, OnboardingText } from "./styles";
import { useFormikContext } from "formik";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.CLUEY_TAN};
  grid-area: container;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Column = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 90%;
  }
`;

export const OnboardingFour = () => {
  const { setFieldValue, values } = useFormikContext();
  return (
    <Wrapper>
      <Column>
        <StyledImg>
          <Image
            src="/images/cluey-box.png"
            height={70}
            width={70}
            layout="responsive"
            priority
          />
        </StyledImg>
        <OnboardingTitle>
          How important are political issues to you?
        </OnboardingTitle>
        <Row style={{ marginBottom: 50 }}>
          <OnboardingText color={theme.CLUEY_DARK_GREY} style={{ margin: 0 }}>
            What does this mean? &nbsp;
          </OnboardingText>
          <Tooltip
            message={
              "Political issues, in the context of Cluey, refers to how corporations impact politics through contributions to political candidates and lobbying to influence relevant policy decisions."
            }
            transform={"translateX(-77%)"}
            width={"270px"}
          >
            <Image
              src="/images/cluey-question-circle-grey.svg"
              height={16}
              width={16}
            />
          </Tooltip>
        </Row>
        <ImportanceInput
          values={values}
          setFieldValue={setFieldValue}
          type="political_issues"
        />
        {values.political_issues > 0 && values.political_issues < 3 && (
          <>
            <Column>
              <OnboardingText
                style={{
                  textAlign: "center",
                  margin: "40px 0px 0px 0px",
                  width: "100% !important",
                  color: theme.CLUEY_DARK_GREEN,
                }}
              >
                How would you describe your political leanings?
              </OnboardingText>
              <ImportanceInput
                values={values}
                setFieldValue={setFieldValue}
                type="political_affiliation"
              />
            </Column>
          </>
        )}
      </Column>
    </Wrapper>
  );
};
