import styled, { css } from "styled-components";
import { theme } from "@/theme/styles";
import Image from "next/image";
import {
  STEP_ONE_ONBOARD,
  STEP_FIVE_ONBOARD,
  STEP_ONE_SIGNUP,
  STEP_FIVE_SIGNUP,
  handleNavigationValidation,
} from "@/utils";
import { useRouter } from "next/router";
import { ShowMessage } from "@/components";
import { useFormikContext } from "formik";
import { useSubscribeUserToKlaviyoList, useUpdateUserPrefs } from "@/mutations";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  grid-area: footer;
  align-items: center;
  background-color: ${theme.CLUEY_TAN};
  border-top: solid 1px ${theme.CLUEY_LIGHT_GREY};
  position: sticky;
  bottom: 0;
  ${(props) =>
    props.stepFive &&
    css`
      border-top: none;
      position: absolute;
      top: 80%;
      background-color: ${theme.CLUEY_NEON_GREEN};
      height: 0px;
      @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
        top: 97%;
      }
      @media (max-width: ${theme.CLUEY_SIZE_FULL_MOBILE}) {
        top: 105%;
      }
    `}
`;

const Container = styled.div`
  display: flex;
  width: 95%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  flex-grow: 0;
  border-radius: 50%;
  border: 2px solid ${theme.CLUEY_DARK_GREY};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;
  transition: 150ms;
  :disabled {
    cursor: default;
    opacity: 0.3;
  }
  padding: 0px;
`;

const Text = styled.p`
  font-family: Inter;
  font-size: 12px;
  line-height: 2.33;
  letter-spacing: -0.12px;
  text-align: center;
  color: ${theme.CLUEY_DARK_GREY};
  margin: 0px;
`;

const StepWrapper = styled.div`
  width: 252px;
  height: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 152px;
  }
`;

const Step = styled.div`
  width: 16px;
  height: 16px;
  border: solid 1.1px ${theme.CLUEY_DARK_GREEN};
  border-radius: 50%;
  background-color: ${(props) =>
    props.bg ? `${theme.CLUEY_DARK_GREEN}` : `${theme.CLUEY_TAN}`};
  z-index: 2;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 12px;
    height: 12px;
  }
`;

const StepLine = styled.div`
  width: 236px;
  height: 1.1px;
  margin: 8px 0 8px 8px;
  background-color: ${theme.CLUEY_DARK_GREEN};
  position: absolute;

  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 136px;
    margin: 0px;
  }
`;

export const SignupFooter = ({
  handleFlowBackNav,
  handleFlowNav,
  activeStep,
  showAlert,
  flowCurrIndex,
  flowArrLength,
  email,
}) => {
  const router = useRouter();
  const { values, errors, touched, setErrors } = useFormikContext();
  const disabledButton = handleNavigationValidation(
    activeStep,
    errors,
    touched,
    values
  );
  return (
    <Wrapper stepFive={activeStep === STEP_FIVE_SIGNUP}>
      <Container>
        <Column>
          <Button
            onClick={handleFlowBackNav}
            disabled={
              activeStep === STEP_ONE_SIGNUP || activeStep === STEP_ONE_ONBOARD
            }
          >
            <Image
              src="/images/cluey-chevron-left.svg"
              alt="Picture of the author"
              width={15}
              height={15}
            />
          </Button>
          <Text>BACK</Text>
        </Column>
        {activeStep !== STEP_FIVE_SIGNUP && (
          <Column>
            <StepWrapper>
              {Array(flowArrLength)
                .fill("")
                .map((_, index) => {
                  return <Step key={index} bg={flowCurrIndex >= index} />;
                })}
              <StepLine />
            </StepWrapper>
            {!router.pathname.includes("signup") && (
              <Text
                onClick={async () => {
                  const onboardingData =
                    JSON.parse(localStorage.getItem("onboardingData")) ||
                    values;
                  const utm_params = localStorage.getItem("utm_params");
                  await useUpdateUserPrefs(onboardingData);

                  await useSubscribeUserToKlaviyoList(email, {
                    prevType: "4-saved_password",
                    nextType: "5-viewed_dashboard",
                    source: utm_params,
                  });
                  router.push("/dashboard");
                }}
                style={{ fontSize: 14, marginTop: 12, cursor: "pointer" }}
              >
                Skip for now
              </Text>
            )}
            {!router.pathname.includes("onboarding") && (
              <Text
                onClick={async () => {
                  router.push("/");
                }}
                style={{ fontSize: 14, marginTop: 12, cursor: "pointer" }}
              >
                Not ready to create an account yet?
              </Text>
            )}
            {showAlert && (
              <ShowMessage
                margin={"10px 0"}
                message={"Brand Added"}
                type={"success"}
              />
            )}
          </Column>
        )}
        <Column>
          <Button
            onClick={() => handleFlowNav(values, setErrors)}
            disabled={disabledButton}
          >
            <Image
              src="/images/cluey-chevron-right.svg"
              alt="Picture of the author"
              width={15}
              height={15}
            />
          </Button>
          <Text>{activeStep === STEP_FIVE_ONBOARD ? "FINISH" : "NEXT"}</Text>
        </Column>
      </Container>
    </Wrapper>
  );
};
