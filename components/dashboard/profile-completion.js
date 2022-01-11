import styled from "styled-components";
import { useEffect, useState } from "react";
import Link from "next/link";
import { theme } from "@/theme/styles";
import { StyledSubtitle, Line, DropDown, DropDownContent } from "./styles";
import { DropdownChevron, Text } from "@/shared-components";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userDataAtom, dashboardButtonStateAtom } from "store/atoms";
import Checkbox from "@material-ui/core/Checkbox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  width: 95%;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  @media (max-width: 1581px) {
    gap: 10px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: ${(props) => props.left};
`;

const ProfileWrapper = styled.div`
  width: 100%;
  margin: 50px 0px 0px 0px;
  border-radius: 20px;
  border: solid 1px #eaeaea;
  background-color: #f8f8f8;
`;

const ProgresBarWrapper = styled.div`
  width: 100%;
  height: 16px;
  border-radius: 20px;
  background-image: linear-gradient(to right, #c4c4c4, #32dc77);
`;

const Progress = styled.div`
  position: relative;
  bottom: 22px;
  height: 28px;
  width: 28px;
  z-index: 4;
  margin-left: ${(props) => props.myProgress === 100 && "-10px"};
  background-color: ${theme.CLUEY_DARK_GREEN};
  border-radius: 50%;
`;

const ProfileItem = styled.div`
  width: 48%;
  height: 41px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  border: solid 2px ${theme.CLUEY_GREY};
  background-color: ${theme.CLUEY_WHITE};
  ${({ border }) =>
    border &&
    `
    border: solid 2px ${theme.CLUEY_LINK_GREEN} !important;
  `}
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 100%;
  }
`;

const NavLink = styled.a`
  text-decoration: underline ${theme.CLUEY_LINK_GREEN};
  flex-grow: 0;
  font-family: ${theme.CLUEY_INTER};
  font-size: 14px;
  font-weight: ${theme.CLUEY_LIGHT};
  line-height: 1.07;
  letter-spacing: -0.14px;
  text-align: center;
  color: ${theme.CLUEY_LINK_GREEN};
  cursor: pointer;
`;

const profileArr = [
  {
    text: "Finish filling out",
    link: "my personal values.",
    value: "my_personal_values",
    redirect: "/my-values",
  },
  {
    text: "Add brands to",
    link: "my bathroom.",
    value: "brands_my_bathroom",
  },
  {
    text: "to five brands.",
    link: "React",
    value: "react_five_brands",
    redirect: "/discover",
  },
  {
    text: "Add brands to",
    link: "my laundry room.",
    value: "brands_laundry_room",
  },
  {
    text: "Add brands to",
    link: "my kitchen.",
    value: "brands_my_kitchen",
  },
  {
    text: "Download the ",
    link: "Cluey Extension.",
    value: "cluey_extension",
    redirect:
      "https://chrome.google.com/webstore/detail/cluey-plugin/fmoicbbcklpmcpmfhjfeohckocafngpn?hl=en",
  },
];

const lines = new Array(8).fill();

const ProgressBar = ({ myProgress }) => {
  return (
    <ProgresBarWrapper>
      <Row style={{ width: "100%" }}>
        {lines.map((_, index) => {
          return <Line key={index} vertical style={{ zIndex: 1 }} />;
        })}
      </Row>
      <Column style={{ justifyContent: "center" }} left={`${myProgress}%`}>
        <Progress myProgress={myProgress} />
        <Text margin={myProgress === 100 ? "-15px 0 0 -15px" : "-15px 0 0 2px"}>
          {myProgress}%
        </Text>
      </Column>
    </ProgresBarWrapper>
  );
};

const ProfileList = ({ link, text, value, profile, redirect }) => {
  const setButton = useSetRecoilState(dashboardButtonStateAtom);

  const isChecked = Object.entries(profile).find(
    (profile) => profile[0] === value
  );

  const scrollToAddBrand = () => {
    document
      .getElementById("addBrandBtn")
      .scrollIntoView({ behavior: "smooth" });
    setButton(true);
  };

  return (
    <ProfileItem border={isChecked[1]}>
      <Checkbox
        type="checkbox"
        checked={isChecked[1]}
        style={{
          color: theme.CLUEY_LINK_GREEN,
        }}
        disabled
      />
      {value === "react_five_brands" && (
        <>
          <Link href={redirect}>
            <NavLink style={{ marginRight: -4 }}>{link}</NavLink>
          </Link>
          <Text fontSize="14px" color={theme.CLUEY_DARK_GREY}>
            {text}
          </Text>
        </>
      )}
      {(value === "brands_my_bathroom" ||
        value === "brands_laundry_room" ||
        value === "brands_my_kitchen") && (
        <>
          <Text fontSize="14px" color={theme.CLUEY_DARK_GREY}>
            {text}
          </Text>
          <NavLink
            style={{ marginLeft: -4 }}
            onClick={() => scrollToAddBrand()}
          >
            {link}
          </NavLink>
        </>
      )}
      {value === "cluey_extension" && (
        <>
          <Text fontSize="14px" color={theme.CLUEY_DARK_GREY}>
            {text}
            <a href={redirect} target="_blank">
              <NavLink style={{ marginLeft: 4 }}>{link}</NavLink>
            </a>
          </Text>
        </>
      )}
      {value === "my_personal_values" && (
        <>
          <Text fontSize="14px" color={theme.CLUEY_DARK_GREY}>
            {text}
            <a href={redirect} target="_blank">
              <NavLink style={{ marginLeft: 4 }}>{link}</NavLink>
            </a>
          </Text>
        </>
      )}
    </ProfileItem>
  );
};

const ExpandedDropdown = ({ profile_completion, progress, checklist }) => (
  <DropDownContent show>
    <Row style={{ justifyContent: "right" }}>
      <Text fontSize="12px" color={theme.CLUEY_DARK_GREEN}>
        Tip: Increase your progress by adding brands to your Household
        Portfolio.
      </Text>
    </Row>
    <ProgressBar myProgress={progress} />
    <ProfileWrapper>
      <Container>
        <Text>
          <span style={{ fontWeight: `${theme.CLUEY_BOLD}` }}>
            My Profile Completion Checklist:{" "}
          </span>
          {checklist}
        </Text>
        <Row style={{ margin: "0px auto" }}>
          {profileArr.map((key, index) => {
            return (
              <ProfileList
                item={key}
                link={key.link}
                text={key.text}
                key={index}
                value={key.value}
                profile={profile_completion}
                redirect={key.redirect}
              />
            );
          })}
        </Row>
      </Container>
    </ProfileWrapper>
  </DropDownContent>
);

export const ProfileCompletion = () => {
  const user = useRecoilValue(userDataAtom);
  const { profile_completion } = user;
  const isLoading = !profile_completion;

  const [dropdownActive, setDropdownActive] = useState(true);
  const [progress, setProgress] = useState(0);
  const [userLevel, setUserLevel] = useState("");
  const [checklist, setChecklist] = useState("");

  useEffect(() => {
    if (!isLoading) {
      const totalItems = Object.values(profile_completion).length;
      const totalCompleted = Object.values(profile_completion).filter(
        (profile) => profile === true
      ).length;
      const currentProgress = parseInt(
        ((totalCompleted / totalItems) * 100).toFixed(0)
      );

      setChecklist(`${totalCompleted} out of ${totalItems} completed`);
      setProgress(currentProgress);

      switch (true) {
        case currentProgress < 35:
          setUserLevel("Beginner");
          break;
        case currentProgress < 55:
          setUserLevel("Intermediate");
          break;
        case currentProgress < 99:
          setUserLevel("Advanced");
          break;
        case currentProgress === 100:
          setUserLevel("Expert");
          break;
        default:
          setUserLevel("Beginner");
      }
    }
  }, [user]);

  return (
    <DropDown>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          gap: 0,
        }}
      >
        <StyledSubtitle
          dropdown
          onClick={() => setDropdownActive((prevState) => !prevState)}
        >
          Profile Completion:
          <span style={{ fontWeight: 600, marginLeft: 5 }}>{userLevel}</span>
          &nbsp;
          <DropdownChevron chevronOpen={dropdownActive} />
        </StyledSubtitle>
      </div>
      {dropdownActive && !isLoading && (
        <ExpandedDropdown
          profile_completion={profile_completion}
          progress={progress}
          checklist={checklist}
        />
      )}
      <Line margin="30px 0px  20px 0px" />
    </DropDown>
  );
};
