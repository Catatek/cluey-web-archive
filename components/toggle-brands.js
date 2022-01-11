import { Column, Text, DropdownChevron, Row } from "@/shared-components";
import { theme } from "@/theme/styles";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  background-color: ${theme.CLUEY_WHITE};
  height: ${(props) => props.height};
  transition: height 1s ease-out;
  overflow-y: hidden;
  overflow-x: hidden;
  border-radius: ${({ borderRadius }) => borderRadius && "20px"};
  background: ${theme.CLUEY_WHITE};
  @media (max-width: ${theme.CLUEY_SIZE_TABLET}) {
    height: auto;
  }
`;

export const ToggleBrands = ({ children, type }) => {
  const [seeMore, setSeeMore] = useState("556px");
  const [dropdownActive, setDropdownActive] = useState(false);
  const handleSeeMore = () => {
    setDropdownActive((prevState) => !prevState);
    seeMore !== "auto" ? setSeeMore("auto") : setSeeMore("556px");

    if (seeMore === "auto") {
      document.getElementById("seeBtn").scrollIntoView({ behavior: "smooth" });
    }
  };

  const landingType = type === "landing";

  return (
    <>
      <Wrapper height={seeMore} borderRadius={landingType} id="seeBtn">
        {children}
      </Wrapper>
      <Column>
        <Row align="center">
          <Text
            fontSize={landingType ? "16px" : "12px"}
            color={
              landingType ? `${theme.CLUEY_WHITE}` : `${theme.CLUEY_DARK_GREY}`
            }
            textAlign={"center"}
          >
            {seeMore == "556px" ? "See More" : "See Less"}
          </Text>
          <DropdownChevron
            chevronOpen={dropdownActive}
            handler={handleSeeMore}
            white={type == "landing"}
          />
        </Row>
      </Column>
    </>
  );
};
