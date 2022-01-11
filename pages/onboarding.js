import { useEffect, useState } from "react";
import {
  Layout,
  OnboardingOne,
  OnboardingTwo,
  OnboardingThree,
  OnboardingFour,
  OnboardingFive,
} from "@/signup-components";
import { useRouter } from "next/router";
import {
  STEP_ONE_ONBOARD,
  STEP_TWO_ONBOARD,
  STEP_THREE_ONBOARD,
  STEP_FOUR_ONBOARD,
  STEP_FIVE_ONBOARD,
  STEP_SIX_ONBOARD,
  validationSchemaOnboarding,
} from "@/utils";
import { useUpdateUserPrefs, useSubscribeUserToKlaviyoList } from "@/mutations";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "@/store";
import { Formik } from "formik";
import { useIntercom } from "react-use-intercom";

const flowArr = [
  STEP_ONE_ONBOARD,
  STEP_TWO_ONBOARD,
  STEP_THREE_ONBOARD,
  STEP_FOUR_ONBOARD,
  STEP_FIVE_ONBOARD,
  STEP_SIX_ONBOARD,
];

// TODO RENAME firstName TO BE first_name

const Onboarding = () => {
  const router = useRouter();
  const { shutdown } = useIntercom();
  const lastActiveStep =
    typeof window !== "undefined" && localStorage.getItem("lastActiveStep");
  const onboardingData =
    typeof window !== "undefined" && localStorage.getItem("onboardingData");
  const [activeStep, setActiveStep] = useState(
    lastActiveStep || STEP_ONE_ONBOARD
  );
  const [flowCurrIndex, setFlowCurrIndex] = useState(0);

  const user = useRecoilValue(userDataAtom);
  const { first_name, email } = user;

  useEffect(() => {
    const lastActiveStep = localStorage.getItem("lastActiveStep");
    if (lastActiveStep) {
      const index = flowArr.indexOf(lastActiveStep);
      setActiveStep(lastActiveStep);
      setFlowCurrIndex(index);
    }
  }, []);

  useEffect(() => {
    if (activeStep === STEP_ONE_ONBOARD) {
      shutdown();
    }
    localStorage.setItem("lastActiveStep", activeStep);
  }, [activeStep]);

  const handleUpdateUser = async (values) => {
    localStorage.setItem("onboardingData", JSON.stringify(values));
    const res = await useUpdateUserPrefs(values);
    if (res.id !== null) {
      return true;
    } else {
      return false;
    }
  };

  const handleFlowNav = async (values) => {
    localStorage.setItem("onboardingData", JSON.stringify(values));

    if (activeStep === STEP_FIVE_ONBOARD) {
      const utm_params = localStorage.getItem("utm_params");
      const res = await handleUpdateUser(values);
      if (res) {
        await useSubscribeUserToKlaviyoList(email, {
          prevType: "4-saved_password",
          nextType: "5-viewed_dashboard",
          source: utm_params,
        });
        router.push("/dashboard");
      }
    } else {
      setFlowCurrIndex((prevState) => prevState + 1);
      setActiveStep(flowArr[flowCurrIndex + 1]);
    }
  };

  const handleFlowBackNav = () => {
    if (flowCurrIndex !== 0) {
      setFlowCurrIndex((prevState) => prevState - 1);
      setActiveStep(flowArr[flowCurrIndex - 1]);
    }
  };

  const initialValues = onboardingData
    ? JSON.parse(onboardingData)
    : {
        social_issues: 3,
        environmental_issues: 3,
        political_issues: 3,
        political_affiliation: 3,
        zip_code: "",
        age: "",
        gender: "",
      };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchemaOnboarding}
    >
      <Layout
        activeStep={activeStep}
        handleFlowNav={handleFlowNav}
        handleFlowBackNav={handleFlowBackNav}
        flowCurrIndex={flowCurrIndex}
        flowArrLength={flowArr.length - 1}
        email={email}
      >
        {activeStep === STEP_ONE_ONBOARD && (
          <OnboardingOne handleFlowNav={handleFlowNav} />
        )}
        {activeStep === STEP_TWO_ONBOARD && <OnboardingTwo />}
        {activeStep === STEP_THREE_ONBOARD && <OnboardingThree />}
        {activeStep === STEP_FOUR_ONBOARD && <OnboardingFour />}
        {activeStep === STEP_FIVE_ONBOARD && (
          <OnboardingFive first_name={first_name} />
        )}
      </Layout>
    </Formik>
  );
};

export default Onboarding;
