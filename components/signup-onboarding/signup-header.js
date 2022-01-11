import styled from "styled-components";
import { theme } from "@/theme/styles";
import Image from "next/image";
import { STEP_FIVE_SIGNUP } from "@/utils";
import { useRouter } from "next/router";
import { StyledImg } from "@/shared-components";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "store/atoms";

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: ${theme.CLUEY_TAN};
  position: static;
  padding-top: 5px;
  grid-area: header;
  ${({ stepFive }) =>
    stepFive &&
    `
    background-color: ${theme.CLUEY_NEON_GREEN};
  `}
`;

const Row = styled.div`
  display: flex;
  width: 95%;
  margin: 0 auto;
  justify-content: space-between;
`;

const Div = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 0 0 12.1px;
  padding: 10px 10px 9px 10px;
  background-color: ${theme.CLUEY_USER_AVATAR};
  border-radius: 50%;
  text-transform: uppercase;
  color: ${theme.CLUEY_WHITE};
  font-family: ${theme.CLUEY_INTER};
  text-align: center;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Text = styled.p`
  font-family: Inter;
  font-size: 14px;
  font-weight: ${theme.CLUEY_SEMI_BOLD};
  letter-spacing: -0.14px;
  text-align: right;
  color: ${theme.CLUEY_MEDIUM_DARK_GREY};
  text-transform: capitalize;
`;

const DropDownMenu = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin: 0 0 0 12.1px;
  padding: 10px 10px 9px 10px;
  background-color: ${theme.CLUEY_USER_AVATAR};
  border-radius: 50%;
  text-transform: uppercase;
  color: ${theme.CLUEY_WHITE};
  font-family: ${theme.CLUEY_INTER};
  text-align: center;
  position: relative;
  ${({ notShow }) =>
    notShow &&
    `
    display:hidde;
    cursor: none;
    background: ${theme.CLUEY_DARK_GREEN};
    z-index:-1;
  `}
`;

const DropDownContent = styled.div`
  position: absolute;
  background-color: ${theme.CLUEY_WHITE};
  width: 231px;
  display: none;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  right: 0;
  margin-top: 20px;
  ${({ show }) => show && `display: flex;`}
`;

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px auto;
  justify-content: center;
  align-items: center;
  width: 95%;
`;

const MenuBtn = styled.button`
  cursor: pointer;
  width: 187px;
  height: 33px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  border-radius: 30px;
  border: solid 1px #e0e0e0;
  background-color: ${theme.CLUEY_WHITE};
  align-items: center;
  font-family: ${theme.CLUEY_INTER};
  font-size: 14px;
  font-weight: ${theme.CLUEY_SEMI_BOLD};
  line-height: 1.93;
  letter-spacing: -0.14px;
  &:hover {
    background-color: ${theme.CLUEY_GRAY_HOVER};
  }
`;
export const SignupHeader = ({ activeStep }) => {
  const router = useRouter();
  const user = useRecoilValue(userDataAtom);
  const { first_name } = user;
  const first_letter = user.first_name?.charAt(0);
  const [dropdownActive, setDropdownActive] = useState(false);
  const handleSettings = () => {
    router.push("/dashboard");
  };

  return (
    <Wrapper stepFive={activeStep === STEP_FIVE_SIGNUP}>
      <Row style={{ marginTop: 20 }}>
        <StyledImg width={"40px"} height={"40px"} cursor={"pointer"}>
          <Image
            src="/images/cluey-sign-logo.png"
            width={40}
            height={40}
            onClick={() => router.push("/")}
          />
        </StyledImg>
        {activeStep.includes("ONBOARD") && (
          <Column>
            <>
              <Text>{first_name || "Guest"}</Text>

              <DropDownMenu
                notShow={router.pathname.includes("public-brands")}
                onClick={() => setDropdownActive((prevState) => !prevState)}
              >
                {first_letter || "G"}
                <DropDownContent show={dropdownActive}>
                  <DropDownContainer>
                    <MenuBtn
                      style={{ margin: "8px 0px" }}
                      onClick={handleSettings}
                    >
                      Go to my dashboard
                    </MenuBtn>
                  </DropDownContainer>
                </DropDownContent>
              </DropDownMenu>
            </>
          </Column>
        )}
      </Row>
    </Wrapper>
  );
};
