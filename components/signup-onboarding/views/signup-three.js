import styled, { css } from "styled-components";
import Image from "next/image";
import { theme } from "@/theme/styles";
import { Searchbar } from "@/searchbar";
import { useFormikContext, FieldArray } from "formik";
import { useGetBrandBySubType } from "@/queries";
import { TitleContainer } from "../title-container";
import { sub_categories } from "constants/sub_categories-data";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.CLUEY_TAN};
  grid-area: container;
  padding-bottom: 90px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  flex-wrap: wrap;
  margin: 12px auto;
  ${(props) =>
    props.brandsRow &&
    css`
      width: 80%;
      gap: 15px;
    `};
  ${(props) =>
    props.tagssRow &&
    css`
      width: 50%;
      gap: 5px;
      min-height: 35px;
    `};
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  opacity: 40%;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
  background-color: ${theme.CLUEY_WHITE};
  border-radius: 50%;
  transition: 150ms;
  font-family: ${theme.CLUEY_INTER};
  border: 1px solid transparent;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      opacity: 100%;
    `}
  &:hover {
    opacity: 100%;
  }
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 80px;
    height: 80px;
  }
`;

const TagWrapper = styled.div`
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${theme.CLUEY_INTER};
  color: ${theme.CLUEY_WHITE};
  gap: 12.5px;
  padding: 10px;
  border-radius: 12px;
  background-color: ${theme.CLUEY_DARK_GREY};
  font-size: 13px;
  cursor: pointer;
`;

const Div = styled.div`
  width: 80%;
  margin: 0 auto;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 100%;
  }
`;

const Tag = ({ name, remove, index }) => (
  <TagWrapper>
    {name}
    <Image
      src="/images/times-solid.svg"
      width={15}
      height={15}
      onClick={() => remove(index)}
    />
  </TagWrapper>
);

const GroceryFoodBeverage = ['Starbucks', 'Special K', 'Canada Dry', 'Silk', 'Blue Moon', 'Kraft', 'Annie\'s', 'Ben & Jerry\'s', 'BOOM CHIKA POP', 'Cheerios', 'Cheez-It',
  'Dave\'s Killer Bread', 'Diet Coke', 'Gatorade', 'Healthy Choice', 'Hunt\'s Tomatoes', 'Justin\'s', 'Kashi', 'Larabar', 'RxBar', 'Tate\'s Bake Shop', 'Tazo']
const CleaningStorageBrands = ['Tide', 'Febreze', 'Lysol', 'Seventh Generation', 'all', 'Arm & Hammer', 'Bounce', 'Cascade', 'Charmin', 'Clorox', 'Cottonelle',
  'Dawn', 'Easy-Off', 'Gain', 'Mr. Clean', 'Pine-Sol', 'Rubbermaid', 'Scott', 'Swiffer', 'Snuggle', 'Bounty', 'Resolve']
const CleansingSelfCareBrands = ['Acuvue', 'Aquafresh', 'Aveeno', 'Burt\'s Bees', 'Clean & Clear', 'Clearasil', 'Colgate', 'CoverGirl', 'Crest', 'Dove', 'essie',
'Garnier', 'Gillette', 'L\'Oreal', 'Listerine', 'Maybelline', 'Olay', 'Suave', 'TRESemme', 'Trojan', 'Irish Spring', 'Vaseline']

export const SignupThree = () => {
  const { values } = useFormikContext();
  const { data, isValidating } = useGetBrandBySubType(
    values.brandsImpact.type_id
  );

  const getMostUsedBrands = (brands, type) => {
    switch (type) {
      case sub_categories[0].type_id:
        return brands.filter(b => GroceryFoodBeverage.includes(b.name))
      case sub_categories[1].type_id:
        return brands.filter(b => CleaningStorageBrands.includes(b.name))
      case sub_categories[2].type_id:
        return brands.filter(b => CleansingSelfCareBrands.includes(b.name))
      default:
        return [];
    }
  }

  const availableBrands = !isValidating && data?.brandsBySubType;
  const mostUsedBrands = availableBrands ? getMostUsedBrands(availableBrands, values.brandsImpact.type_id) : false;

  return (
    <Wrapper>
      <FieldArray name="brands">
        {({ remove, push }) => (
          <Container>
            <TitleContainer
              src={values.brandsImpact.image}
              title={values.brandsImpact.name}
              text="Pick as many as 10 brands that you currently buy."
              marginBottom
            />
            <Div>
              <Searchbar
                isSignup={true}
                searchAction={"addBrand"}
                handleAddBrandSignup={push}
              />
            </Div>
            <Row tagssRow>
              {values.brands.map((key, index) => {
                return (
                  <Tag
                    key={index}
                    index={index}
                    name={key.name}
                    id={key.brand_id}
                    remove={remove}
                  />
                );
              })}
            </Row>
            <Row brandsRow>
              {mostUsedBrands &&
                mostUsedBrands.length > 0 &&
                mostUsedBrands.map((key, index) => {
                  return (
                    <Brand
                      active={values.brands.some(
                        (elem) => elem.brand_id === key.id
                      )}
                      key={index}
                      onClick={() =>
                        push({
                          name: key.name,
                          brand_id: key.id,
                          brand_type: values.brandsImpact.type_id,
                        })
                      }
                    >
                      <img
                        src={key.brand_logo_url}
                        style={{ objectFit: "contain", width: 60 }}
                        alt={`${key.name} logo`}
                      />
                    </Brand>
                  );
                })}
            </Row>
          </Container>
        )}
      </FieldArray>
    </Wrapper>
  );
};
