import styled from "styled-components";
import { theme } from "@/theme/styles";

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  padding: 60px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-template-rows: auto;
  width: 70%;
  margin: 20px auto;
  grid-gap: 30px;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BrandImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin: auto;
  border: solid 1px ${theme.CLUEY_LIGHT_SHADE_RED};
  opacity: 50%;
  background: ${({ background }) => background};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  ${({ isSelected }) =>
    isSelected &&
    `
      opacity: 100%;
      border: solid 1.1px ${theme.CLUEY_DARK};
    `}
  &:hover {
    opacity: 70%;
  }
`;

const NoAlternatives = styled.div`
  padding: 24px 14px;
  font-family: ${theme.CLUEY_INTER};
  color: ${theme.CLUEY_DARK_GREY};
  font-size: 14px;
`;

export const AlternativesGrid = ({
  alternatives,
  activeBrand,
  handleSelectBrand,
}) => {
  if (!alternatives || alternatives.length === 0) {
    return (
      <NoAlternatives>
        No alternatives were found for this brand!
      </NoAlternatives>
    );
  }
  return (
    <Wrapper>
      <Grid>
        {alternatives &&
          alternatives.map((brand) => {
            return (
              <BrandImg
                onClick={() => handleSelectBrand(brand.id)}
                key={brand.id}
                isSelected={activeBrand.id === brand.id}
                background={`url('${brand.brand_logo_url}')`}
              />
            );
          })}
      </Grid>
    </Wrapper>
  );
};
