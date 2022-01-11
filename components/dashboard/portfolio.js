import { theme } from "@/theme/styles";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BrandCard } from "@/components";
import { DropDown, DropDownContent, Line, StyledSubtitle } from "./styles";
import { Searchbar } from "components/searchbar/searchbar";
import { dashboardButtonStateAtom } from "@/store";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Column, DropdownChevron } from "@/shared-components";
import { useGetUserPortfolio } from "@/queries";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  width: 95%;
`;

const Row = styled.div`
  display: flex;

  gap: 20px;
  ${(props) =>
    props.filterRow &&
    css`
      flex-wrap: nowrap;
      gap: 5px;
    `}
`;

const StyledImage = styled.div`
  width: 25px;
  height: 25px;
`;

const OutlineBtn = styled.div`
  cursor: pointer;
  width: 125px;
  height: 34px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 36px;
  border: solid 1px ${theme.CLUEY_DARK_GREY};
  color: ${theme.CLUEY_DARK_GREY};
  font-family: ${theme.CLUEY_INTER};
  font-size: 10px;
  letter-spacing: -0.13px;
  font-weight: ${theme.CLUEY_SEMI_BOLD};
  &:hover {
    background-color: ${theme.CLUEY_GRAY_HOVER};
  }
`;

const StyledColumn = styled(Column)`
  &:first-child {
    border-top: none;
  }
`;

const ExpandedDropdown = ({
  dropdown,
  activeSubDropdowns,
  handleSubTypeDropdown,
  mutate,
}) => (
  <DropDownContent show>
    {dropdown &&
      dropdown.map((key, index) => {
        return (
          <Row key={index}>
            <DropDown>
              <Row
                style={{
                  flexWrap: "nowrap",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <StyledSubtitle
                  dropdown
                  small={1}
                  onClick={() => handleSubTypeDropdown(key.id)}
                >
                  {key.name} &nbsp;
                  <DropdownChevron
                    chevronOpen={activeSubDropdowns.includes(key.id)}
                  />
                </StyledSubtitle>
              </Row>
              <Line />

              <DropDownContent show={activeSubDropdowns.includes(key.id)}>
                <StyledColumn>
                  {key &&
                    key.brands.map((brands, index) => {
                      return (
                        <BrandCard
                          key={index}
                          brandData={brands}
                          mutateHandler={mutate}
                          showDeleteBtn
                          showReactionsActions
                          dashboard={true}
                        />
                      );
                    })}
                </StyledColumn>
              </DropDownContent>
            </DropDown>
          </Row>
        );
      })}
  </DropDownContent>
);

export const Portfolio = () => {
  const { data, isValidating, mutate } = useGetUserPortfolio({
    withCategories: true,
  });
  const buttonActive = useRecoilValue(dashboardButtonStateAtom);
  const [activeDropdowns, setActiveDropdowns] = useState([
    "generalHousehold",
    "bedroom",
    "bathroom",
    "kitchen",
    "laundry",
  ]);
  const [activeSubDropdowns, setActiveSubDropdowns] = useState([]);
  const [activeMainDropDown, setActiveMainDropDown] = useState(true);
  const [filterByRoom, setFilterByRoom] = useState("All Rooms");
  const [categories, setCategories] = useState([]);
  const setButtonActive = useSetRecoilState(dashboardButtonStateAtom);

  const handleDropdown = (type) => {
    if (activeDropdowns.includes(type)) {
      let newArr = [...activeDropdowns];

      const selectedDropdownIndex = activeDropdowns.findIndex(
        (elem) => elem === type
      );
      newArr.splice(selectedDropdownIndex, 1);
      setActiveDropdowns(newArr);
    } else {
      setActiveDropdowns([...activeDropdowns, type]);
    }
  };

  const handleSubTypeDropdown = (type) => {
    if (activeSubDropdowns.includes(type)) {
      let newArr = [...activeSubDropdowns];
      const selectedSubDropdownIndex = activeSubDropdowns.findIndex(
        (elem) => elem === type
      );
      newArr.splice(selectedSubDropdownIndex, 1);
      setActiveSubDropdowns(newArr);
    } else {
      setActiveSubDropdowns([...activeSubDropdowns, type]);
    }
  };

  const handleAddBrands = () => {
    setButtonActive((prevState) => !prevState);
  };

  useEffect(() => {
    let arr = [];
    data?.userPortfolioWithCategories.map((category) => {
      category.subTypes.map((subtype) => {
        if (subtype.brands.length > 0) {
          arr.push(subtype.id);
        }
      });
    });
    setActiveSubDropdowns(arr);
  }, [data]);

  useEffect(() => {
    if (!isValidating) {
      const filteredCategories =
        filterByRoom !== "All Rooms"
          ? data.userPortfolioWithCategories.filter(
              (category) => category.name === filterByRoom
            )
          : data.userPortfolioWithCategories;

      setCategories(filteredCategories);
    }
  }, [data, filterByRoom, isValidating]);

  return (
    <>
      <DropDown>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            marginBottom: 20,
          }}
        >
          <StyledSubtitle
            dropdown
            onClick={() => setActiveMainDropDown((prevState) => !prevState)}
          >
            My Household Portfolio : &nbsp;
            <DropdownChevron chevronOpen={activeMainDropDown} />
          </StyledSubtitle>

          {/* <PortfolioFilter
              categories={data?.userPortfolioWithCategories}
              filterByRoom={filterByRoom}
              setFilterByRoom={setFilterByRoom}
            /> */}
          <OutlineBtn id="addBrandBtn" onClick={handleAddBrands}>
            Add Brands
          </OutlineBtn>
        </div>
      </DropDown>
      {buttonActive && <Searchbar />}
      {activeMainDropDown && (
        <>
          {data &&
            categories.map((key) => {
              let brands;
              key.subTypes.map((subType) => {
                brands = subType.brands;
              });

              return (
                <DropDown key={key.type}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "nowrap",
                      gap: 0,
                    }}
                  >
                    <StyledImage style={{ marginRight: 10, marginTop: 23 }}>
                      <Image
                        src={key.image}
                        width={40}
                        height={40}
                        layout="responsive"
                      />
                    </StyledImage>
                    <StyledSubtitle
                      margin={"16px 0 0 0"}
                      dropdown
                      onClick={() => handleDropdown(key.type)}
                    >
                      {key.name}
                      &nbsp;
                      <DropdownChevron
                        chevronOpen={activeDropdowns.includes(key.type)}
                      />
                    </StyledSubtitle>
                  </div>
                  <Line />
                  <Container>
                    {activeDropdowns.includes(key.type) && (
                      <ExpandedDropdown
                        dropdown={key.subTypes}
                        activeSubDropdowns={activeSubDropdowns}
                        handleSubTypeDropdown={handleSubTypeDropdown}
                        subTypes={brands}
                        mutate={mutate}
                      />
                    )}
                  </Container>
                </DropDown>
              );
            })}
        </>
      )}
    </>
  );
};
