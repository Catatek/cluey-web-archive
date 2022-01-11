import { useSearchBrands, useGetAllBrandIdsInPortfolio } from "@/queries";
import Link from 'next/link'
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { SearchedItem } from "./searched-item";
import { InputContainer, Input, DropDownContent, BrandWrapper } from "./styles";
import { theme } from "@/theme/styles";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  margin: ${({ margin }) => margin && "22px 0"};
`;

const Text = styled.p`
  font-family: ${theme.CLUEY_INTER};
  font-size: 11px;
  margin: 0 20px;
`

// TODO REFACTOR

export const Searchbar = ({
  searchAction,
  handleAddBrandSignup,
  margin,
  isSignup,
}) => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" && localStorage.getItem("authorization");
  const [dropdownActive, setDropdownActive] = useState(false);
  const [query, setQuery] = useState("");
  const { data, isValidating } = useSearchBrands(query.length > 1 && query);
  const {
    data: brandIdsInPortfolio,
    isValidating: isValidatingPortfolio,
    mutate,
  } = useGetAllBrandIdsInPortfolio(query.length > 1 && query);

  const filteredBrands = !isValidating && data?.searchBrand;

  const brandIdsArr =
    !isValidatingPortfolio && brandIdsInPortfolio?.getAllBrandIdsInPortfolio;

  const NotFoundText = !router.pathname.includes("discover")
    ? <Text>{`It looks like we don’t currently have that brand in our database. 
                Come back soon as we are adding brands every week. 
                In the meantime, you can discover brands by category `}
        <Link href={"/discover"}>here</Link>{`.`}
      </Text>
    : <Text>{`It looks like we don’t currently have that brand in our database. 
        Come back soon as we are adding brands every week.`}
      </Text>;

  const handleSearch = async (value) => {
    setQuery(value);

    if (value.length > 1) {
      setDropdownActive(true);
    } else {
      setDropdownActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setDropdownActive(false);
        setQuery("");
      }
    });
    return () => {
      document.removeEventListener("keydown");
    };
  }, []);

  const placeholderText =
    !token && searchAction === "addBrand"
      ? "Or, you can search for brands directly"
      : `Try searching for a brand`;

  return (
    <Wrapper margin={margin}>
      <InputContainer borderBottom={dropdownActive}>
        <span style={{ marginLeft: 15, minWidth: 20 }}>
          <Image
            src={"/images/cluey-search-icon-grey.svg"}
            height={15}
            width={30}
          />
        </span>

        <Input
          id="searchInput"
          type="text"
          paddingLeft={dropdownActive}
          placeholder={placeholderText}
          onChange={(e) => handleSearch(e.target.value)}
          autoComplete="off"
          value={query}
        />
        {dropdownActive && (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setDropdownActive(false)}
          >
            <Image
              src={"/images/cluey-times-dark.svg"}
              height={15}
              width={30}
            />
          </span>
        )}
      </InputContainer>
      {dropdownActive && (
        <DropDownContent show={dropdownActive}>
          {filteredBrands && (filteredBrands.length > 0 ?
            filteredBrands.map((key, index) => {
              return (
                <SearchedItem
                  isSignup={isSignup}
                  key={index}
                  dataBrand={key}
                  name={key.name}
                  type={key.brand_sub_type}
                  id={key.slug}
                  brand_logo_url={key.brand_logo_url}
                  setDropdownActive={setDropdownActive}
                  searchAction={searchAction}
                  handleAddBrandSignup={handleAddBrandSignup}
                  setQuery={setQuery}
                  brandIdsArr={brandIdsArr}
                  token={token}
                  mutate={mutate}
                />
              );
            }) :
            <BrandWrapper>{NotFoundText}</BrandWrapper>)}
        </DropDownContent>
      )}
    </Wrapper>
  );
};
