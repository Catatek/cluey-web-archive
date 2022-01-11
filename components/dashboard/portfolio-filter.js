import { theme } from "@/theme/styles";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import { DropDown, DropDownContent } from "./styles";
import { DropdownChevron } from "@/shared-components";

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex-wrap: nowrap;
  gap: 5px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TextBase = styled.p`
  font-family: ${theme.CLUEY_INTER};
`

const TextFilter = styled(TextBase)`
  font-size: 12px;
`

const TextName = styled(TextBase)`
  font-size: 10px;
  margin: 4px 0;
  color: ${(props) => (props.color ? props.color : " ")};
`

const StyledDropdown = styled(DropDown)`
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE_LG}) {
    display: none;
  }
`;

export const PortfolioFilter = ({
  categories,
  filterByRoom,
  setFilterByRoom,
}) => {
  const isLoading = !categories;
  const [dropdownActive, setDropdownActive] = useState(false);
  const [categoryList, seCategoryList] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      seCategoryList(categories);
      seCategoryList((prevState) => [
        {
          id: "All Rooms",
          name: "All Rooms",
        },
        ...prevState,
      ]);
    }
  }, [isLoading]);

  return (
    <StyledDropdown>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextFilter
            onClick={() => setDropdownActive((prevState) => !prevState)}
          >
            Filter By: {filterByRoom}
          </TextFilter>

          <DropdownChevron
            mobileDisplay={"none"}
            chevronOpen={dropdownActive}
            handler={() => setDropdownActive((prevState) => !prevState)}
            small
          />
        </div>
      </div>
      <DropDownContent right show={dropdownActive}>
        <Column>
          <>
            {categoryList.map((key, index) => {
              return (
                <Row
                  key={index}
                  style={{
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                  onClick={() => setFilterByRoom(key.name)}
                >
                  <TextName
                    color={
                      filterByRoom === key.name
                        ? theme.CLUEY_DARK_GREEN
                        : theme.CLUEY_DARK_GREY
                    }
                  >
                    {key.name}
                  </TextName>
                  {filterByRoom === key.name && (
                    <Image
                      src="/images/cluey-check-green.svg"
                      width={8}
                      height={8}
                    />
                  )}
                </Row>
              );
            })}
          </>
        </Column>
      </DropDownContent>
    </StyledDropdown>
  );
};
