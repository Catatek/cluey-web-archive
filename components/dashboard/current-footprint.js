import styled from "styled-components";
import { TitleBase } from "@/theme/index";
import { theme } from "@/theme/styles";
import { BrandSummary, ShowMessage } from "@/components";
import { Line, StyledSubtitle } from "./styles";
import { useState } from "react";
import { dashboardButtonStateAtom, userDataAtom } from "@/store";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useGetUserFootprint } from "@/queries";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const StyledTitle = styled(TitleBase)`
  margin: 0px;
  font-size: 34px;
  font-weight: ${theme.CLUEY_BOLD};
  letter-spacing: -0.34px;
  text-align: left;
`;

export const CurrentFootprint = () => {
  const [isShowAlert, setIsShowAlert] = useState(true);
  const user = useRecoilValue(userDataAtom);
  const setButton = useSetRecoilState(dashboardButtonStateAtom);

  const { data, isValidating } = useGetUserFootprint();

  const userFootprint = !isValidating && data?.userFootprint;

  const handleClick = (type) => {
    switch (type) {
      case "scroll":
        document
          .getElementById("addBrandBtn")
          .scrollIntoView({ behavior: "smooth" });
        setButton(true);
        break;
      case "close":
        setIsShowAlert(false);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Row>
        <StyledTitle>Welcome, {user.first_name}.</StyledTitle>
        <ShowMessage
          show={isShowAlert}
          type={"warning"}
          message={"Click here to start adding brands to your household!"}
          action={() => handleClick("scroll")}
        />
      </Row>
      <Line />
      <StyledSubtitle style={{ marginBottom: 30 }}>
        My Current Impact Footprint
      </StyledSubtitle>
      <BrandSummary
        type="currentFootprint"
        planetImpact={userFootprint.planet_impact}
        peopleImpact={userFootprint.people_impact}
        politicalImpact={userFootprint.political_impact}
      />
      <Line margin="20px 0px" />
    </>
  );
};
