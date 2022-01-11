import { useEffect, useState } from "react";
import {
  Layout,
  SignupOne,
  SignupTwo,
  SignupThree,
  SignupFour,
  SignupFive,
} from "@/signup-components";
import {
  STEP_ONE_SIGNUP,
  STEP_TWO_SIGNUP,
  STEP_THREE_SIGNUP,
  STEP_FOUR_SIGNUP,
  STEP_FIVE_SIGNUP,
  validationSchemaSignup,
} from "@/utils";
import { useUserSignup } from "@/mutations";
import { useVerifyEmail } from "@/queries";
import { useSetRecoilState } from "recoil";
import { userDataAtom } from "@/store";
import { useRouter } from "next/router";
import { useIntercom } from "react-use-intercom";
import { Formik } from "formik";

const flowArr = [
  STEP_ONE_SIGNUP,
  STEP_TWO_SIGNUP,
  STEP_THREE_SIGNUP,
  STEP_FOUR_SIGNUP,
  STEP_FIVE_SIGNUP,
];

const Signup = () => {
  const router = useRouter();
  const { shutdown } = useIntercom();
  const queryEmail = router.query.email;
  const [activeStep, setActiveStep] = useState(STEP_ONE_SIGNUP);
  const [flowCurrIndex, setFlowCurrIndex] = useState(0);
  const setUser = useSetRecoilState(userDataAtom);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(async () => {
    if (activeStep === STEP_ONE_SIGNUP) {
      shutdown();
      localStorage.clear();
      const { query } = router;
      if (query && Object.keys(query).length !== 0 && !query.email && query.email != '') {
        console.log(query);
        localStorage.setItem("utm_params", JSON.stringify(query));
      }
    }
  }, [activeStep, router]);

  const handleSignup = async (values) => {
    const user = await useUserSignup(values);
    if (user) {
      localStorage.setItem("authorization", user.token);
      setUser(user);
      return true;
    } else return false;
  };

  const handleFlowNav = async (values, setErrors) => {
    if (activeStep === STEP_ONE_SIGNUP) {
      const res = await useVerifyEmail(values.email);
      if (res === "Ok") {
        setFlowCurrIndex(1);
        setActiveStep(STEP_TWO_SIGNUP);
      } else {
        setErrors({ email: "This email is already in use." });
      }
    } else if (activeStep === STEP_FOUR_SIGNUP) {
      const res = await handleSignup(values);
      if (res) {
        setFlowCurrIndex(4);
        setActiveStep(STEP_FIVE_SIGNUP);
      }
    } else if (activeStep === STEP_FIVE_SIGNUP) {
      router.push("onboarding");
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

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: queryEmail || "",
        password: "",
        src: "",
        terms: false,
        brandsImpact: {},
        brands: [],
      }}
      validationSchema={validationSchemaSignup}
    >
      <Layout
        activeStep={activeStep}
        handleFlowNav={handleFlowNav}
        handleFlowBackNav={handleFlowBackNav}
        showAlert={showAlert}
        flowCurrIndex={flowCurrIndex}
        flowArrLength={flowArr.length - 1}
      >
        {activeStep === STEP_ONE_SIGNUP && <SignupOne />}
        {activeStep === STEP_TWO_SIGNUP && (
          <SignupTwo handleFlowNav={handleFlowNav} />
        )}
        {activeStep === STEP_THREE_SIGNUP && (
          <SignupThree setShowAlert={setShowAlert} />
        )}
        {activeStep === STEP_FOUR_SIGNUP && <SignupFour />}

        {activeStep === STEP_FIVE_SIGNUP && (
          <SignupFive activeStep={activeStep} />
        )}
      </Layout>
    </Formik>
  );
};

export default Signup;
