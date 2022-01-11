import styled from "styled-components";
import { theme } from "@/theme/styles";
import { WrapperBase } from "@/theme/index";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { currentTokenUserAtom, userDataAtom } from "@/store";
import { Searchbar } from "@/searchbar";

const Wrapper = styled(WrapperBase)`
  background: ${theme.CLUEY_DARK_GREEN};
  grid-area: top;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const Container = styled.div`
  width: 95%;
  height: 100%;
  margin: 0 auto;
  align-items: center;
  display: flex;
  justify-content: space-between;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  max-width: 650px;
  justify-content: space-between;
  margin: -42px 0px -39px 0px;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 70%;
  }
  @media (max-width: ${theme.CLUEY_SIZE_FULL_MOBILE}) {
    width: 100%;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
`;

const StyledImg = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${theme.CLUEY_SIZE_FULL_MOBILE}) {
    margin: 0 8px;
    width: 35px;
    height: 35px;
  }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
`

const DropDownMenu = styled.div`
  cursor: pointer;
  width: 50px;
  height: 50px;
  margin-left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: ${theme.CLUEY_USER_AVATAR};
  border-radius: 50%;
  color: ${theme.CLUEY_WHITE};
  font-family: ${theme.CLUEY_INTER};
  text-align: center;
  position: relative;
  @media (max-width: ${theme.CLUEY_SIZE_FULL_MOBILE}) {
    width: 40px;
    height: 40px;
    margin-left: 6px;
  }
  ${({ notShow }) =>
    notShow &&
    `
    display: none;
  `}
`;

const DropDownContent = styled.div`
  position: absolute;
  background-color: ${theme.CLUEY_WHITE};
  width: 230px;
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  border-radius: 6px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  right: 0;
  top: 55px;
`;

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px auto;
  justify-content: center;
  align-items: center;
  width: 95%;
`;

const Text = styled.p`
  font-family: ${theme.CLUEY_INTER};
  color: ${theme.CLUEY_WHITE};
  font-size: 14px;
  font-weight: ${theme.CLUEY_SEMI_BOLD};
  letter-spacing: -0.14px;
  text-align: right;
  @media (max-width: ${theme.CLUEY_SIZE_FULL_MOBILE}) {
    display: none;
  }
`;

const Name = styled(Text)`
  color: ${theme.CLUEY_BLACK};
  text-align: "center";
  margin: 0;
`;

const Label = styled.label`
  font-size: 12px;
  font-family: ${theme.CLUEY_INTER};
  line-height: 2.25;
  letter-spacing: -0.12px;
  color: ${theme.CLUEY_LIGHT_GREY_NORMAL};
`;

const MenuBtn = styled.button`
  cursor: pointer;
  width: 187px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 30px;
  border: solid 1px ${theme.CLUEY_LIGHT_SHADE_RED};
  background-color: ${theme.CLUEY_WHITE};
  align-items: center;
  font-family: ${theme.CLUEY_INTER};
  font-size: 14px;
  font-weight: ${theme.CLUEY_SEMI_BOLD};
  line-height: 1.93;
  letter-spacing: -0.14px;
  margin: "8px 0px";
  &:hover {
    background-color: ${theme.CLUEY_GRAY_HOVER};
  }
`;

const LogoutBtn = styled.button`
  cursor: pointer;
  font-size: 12px;
  border: none;
  color: ${theme.CLUEY_MEDIUM_GREY};
  font-family: ${theme.CLUEY_INTER};
  line-height: 2.25;
  letter-spacing: -0.12px;
  text-align: center;
  background-color: ${theme.CLUEY_WHITE};
  &:hover {
    transform: scale(1.1);
  }
`;

export const TopNav = () => {
  const user = useRecoilValue(userDataAtom);
  const { first_name, email } = user;
  const [dropdownActive, setDropdownActive] = useState(false);
  const name = first_name;
  const firstLetter = name ? name.charAt(0) : "";
  const token = useRecoilValue(currentTokenUserAtom);

  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };
  const handleSettings = () => {
    router.push("/settings/manage-account");
  };

  return (
    <Wrapper>
      <Container>
        <Row>
          <StyledImg onClick={() => router.push("/")}>
            <Img
              src="/images/cluey-sign-logo.png"
            />
          </StyledImg>
          {!router.pathname.includes("discover") && <Searchbar />}
        </Row>
        <Menu>
          <Text>{name}</Text>
          <DropDownMenu
            notShow={!token}
            onClick={() => setDropdownActive((prevState) => !prevState)}
          >
            {firstLetter}
            <DropDownContent show={dropdownActive}>
              <DropDownContainer>
                <Name>
                  {name}
                </Name>
                <Label>{email}</Label>
                <MenuBtn onClick={handleSettings}>
                  Manage Account
                </MenuBtn>
                <LogoutBtn onClick={handleLogout}>Log Out</LogoutBtn>
              </DropDownContainer>
            </DropDownContent>
          </DropDownMenu>
        </Menu>
      </Container>
    </Wrapper>
  );
};
