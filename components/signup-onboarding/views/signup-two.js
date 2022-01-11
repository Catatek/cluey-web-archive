import styled from "styled-components";
import Image from "next/image";
import { theme } from "@/theme/styles";
import { useFormikContext } from "formik";
import { TitleContainer } from "../title-container";
import { sub_categories } from "constants/sub_categories-data";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.CLUEY_TAN};
  grid-area: container;
`;

const Container = styled.div`
  width: 90%;
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 225px);
  grid-template-rows: 250px;
  margin: 0 auto;
  padding: 25px 0;
  grid-gap: 25px;
  @media (max-width: ${theme.CLUEY_SIZE_TABLET}) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    grid-template-rows: auto;
    width: 100%;
  }
  @media (max-width: ${theme.CLUEY_SIZE_FULL_MOBILE}) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
`;

const BrandWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 150px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${theme.CLUEY_WHITE};
  border: none;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.15);
  opacity: 60%;
  transition: 200ms;
  cursor: pointer;
  &:hover {
    opacity: 100%;
  }
  ${({ active }) =>
    active &&
    `
    opacity: 100%;
  `}
  @media (max-width: ${theme.CLUEY_SIZE_FULL_MOBILE}) {
    padding: 10px;
  }
`;

const BrandText = styled.p`
  margin: 0;
  line-height: 1.4;
  font-family: ${theme.CLUEY_INTER};
  font-size: 16px;
  text-align: center;
  color: ${theme.CLUEY_GREY};
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    margin: 0;
    font-size: 14px;
  }
`;

const CategoryCard = ({ brandType, values, setFieldValue, handleFlowNav }) => {
  return (
    <BrandWrapper
      onClick={(e) => {
        e.preventDefault();
        setFieldValue("brandsImpact", { ...brandType });
        handleFlowNav(values);
      }}
    >
      <Image src={brandType.image} width={50} height={50} layout="intrinsic" />
      <BrandText style={{ marginTop: 16 }}>{brandType.name}</BrandText>
    </BrandWrapper>
  );
};

export const SignupTwo = ({ handleFlowNav }) => {
  const { setFieldValue, values } = useFormikContext();
  return (
    <Wrapper>
      <Container>
        <TitleContainer
          src="/images/signup-light.png"
          title="Want to see the impact of the brands you buy?"
          text="Let’s start small. Pick an option below:"
        />
        <Grid>
          {sub_categories.map((key, index) => {
            return (
              <CategoryCard
                key={index}
                brandType={key}
                index={index}
                setFieldValue={setFieldValue}
                values={values}
                handleFlowNav={handleFlowNav}
              />
            );
          })}
        </Grid>
      </Container>
    </Wrapper>
  );
};
