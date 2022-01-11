import { theme } from "@/theme/styles";
import { Row, OutlineBtn } from "@/shared-components";
import { useRouter } from "next/router";
import FormControl from "@material-ui/core/FormControl";
import { BrandWrapper, ImgContainer, TriggerBtn } from "./styles";
import { Multiselect } from "./multiselect";
import styled from "styled-components";

const LinkContainer = styled.div`
  width: auto;
  cursor: pointer;
`;

export const BrandWrapperSearched = styled(BrandWrapper)`
  transition: 250ms;
  &:hover {
    background-color: ${theme.CLUEY_GRAY};
  }
`;

const SubTypeText = styled.p`
  color: ${theme.CLUEY_DARK_GREY};
  font-family: ${theme.CLUEY_INTER};
  font-size: 8px;
  margin: 0;
  @media (max-width: 500px) {
    display: none;
  }
`;

const Text = styled.p`
  font-family: ${theme.CLUEY_INTER};
  font-size: 10px;
  margin: 0;
`

export const SearchedItem = ({
  name,
  type,
  id,
  brand_logo_url,
  dataBrand,
  searchAction,
  handleAddBrandSignup,
  setDropdownActive,
  setQuery,
  brandIdsArr,
  mutate,
  token,
}) => {
  const router = useRouter();

  const isBrandInPortfolio = brandIdsArr
    ? brandIdsArr.some((item) => item.brand_id === id)
    : false;

  return (
    <BrandWrapperSearched
      onClick={() => {
        setDropdownActive(false);
      }}
    >
      <LinkContainer
        onClick={() => {
          router.push(`/brands/${id}`);
        }}
      >
        <Row align={"center"}>
          <ImgContainer style={{ margin: "0 10px" }}>
            <img
              src={brand_logo_url || `/images/how-it-works-cluey-icon.png`}
              style={{ width: 30, objectFit: "contain" }}
            />
          </ImgContainer>
          <Text>
            {name}
          </Text>
        </Row>
      </LinkContainer>
      <Row align={"center"}>
        <SubTypeText>{type}</SubTypeText>
        {!token ? (
          <TriggerBtn
            onClick={
              searchAction === "addBrand"
                ? (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleAddBrandSignup({
                      name: dataBrand.name,
                      brand_id: dataBrand.id,
                      brand_type: dataBrand.brand_sub_type_id,
                    });
                    setQuery("");
                    setDropdownActive(false);
                  }
                : () => {
                    router.push(`/brands/${id}`);
                    setDropdownActive(false);
                    setQuery("");
                  }
            }
          >
            {searchAction === "addBrand" ? "Add Brand" : "View Brand"}
          </TriggerBtn>
        ) : (
          <FormControl>
            <OutlineBtn
              width={"100px"}
              margin={"0px 10px 0px 30px"}
              type={"addRemove"}
              dataBrand={dataBrand}
              bgColor={
                isBrandInPortfolio ? `${theme.CLUEY_LIME_GREEN}` : "none"
              }
              border={
                isBrandInPortfolio
                  ? `${theme.CLUEY_LIME_GREEN}`
                  : `${theme.CLUEY_DARK_GREY}`
              }
              color={
                isBrandInPortfolio
                  ? `${theme.CLUEY_USER_AVATAR}`
                  : `${theme.CLUEY_DARK_GREY}`
              }
              height={"35px"}
            >
              {isBrandInPortfolio ? "Remove" : "Add"}
              <Multiselect
                isBrandInPortfolio={isBrandInPortfolio}
                mutate={mutate}
                dataBrand={dataBrand}
                id={id}
              />
            </OutlineBtn>
          </FormControl>
        )}
      </Row>
    </BrandWrapperSearched>
  );
};
