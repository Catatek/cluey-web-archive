import { theme } from "@/theme/styles";
import Image from "next/image";
import styled from "styled-components";
import {
  OnboardingTitle,
  Option,
  Input,
  Select,
  OnboardingText,
  StyledImg,
} from "./styles";
import { Tooltip } from "@/components";
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
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: ${(props) => (props.gap ? "40px" : "normal")};
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 90%;
  }
`;

export const OnboardingFive = ({ first_name }) => {
  const { errors, touched, values, handleChange, handleBlur } =
    useFormikContext();
  const ages = ["18-24", "25-34", "35-44", "45-54", "55-64", "65 and older"];
  return (
    <Wrapper>
      <Column>
        <StyledImg>
          <Image
            src="/images/cluey-smile-emoji.png"
            height={70}
            width={70}
            layout="responsive"
          />
        </StyledImg>
        <OnboardingTitle style={{ marginBottom: 20 }}>
          Almost there!
        </OnboardingTitle>
        <OnboardingText text>
          Thanks for filling that out, {first_name || "Guest"}. This is the last
          step before we take you to your Cluey dashboard to see your total
          impact footprint across all of your household brands.
        </OnboardingText>
        <Row style={{ margin: "10px 0px 20px 0px" }}>
          <OnboardingText color={theme.CLUEY_DARK_GREY} style={{ margin: 0 }}>
            Why do you need to know this? &nbsp;
          </OnboardingText>
          <Tooltip
            width={"250px"}
            transform={"translateX(-90%)"}
            message={
              "This optional information helps us provide you with more relevant search results and recommendations on Cluey."
            }
          >
            <Image
              src="/images/cluey-question-circle-grey.svg"
              height={16}
              width={16}
            />
          </Tooltip>
        </Row>
        <Column gap style={{ marginTop: 40 }}>
          <Input
            placeholder="Zip Code"
            name="zip_code"
            error={touched.zip_code && errors.zip_code}
          />
          <Select
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.age}
            name="age"
            error={touched.age && errors.age}
          >
            <Option value="">Age</Option>
            {ages.map((key, index) => (
              <Option value={key} key={index}>
                {key}
              </Option>
            ))}
          </Select>
          <Select
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.gender}
            name="gender"
            error={touched.gender && errors.gender}
          >
            <Option value="">Gender</Option>
            <Option value="Woman">Woman</Option>
            <Option value="Man">Man</Option>
            <Option value="Non-binary">Non-binary</Option>
            <Option value="Prefer to self-describe">
              Prefer to self-describe
            </Option>
            <Option value="Prefer not to say">Prefer not to say</Option>
          </Select>
        </Column>
      </Column>
    </Wrapper>
  );
};
