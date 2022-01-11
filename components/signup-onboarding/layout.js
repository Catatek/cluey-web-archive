import styled from "styled-components";
import "normalize.css";
import { SignupFooter, SignupHeader } from "./index";
import Head from "next/head";
import { STEP_FIVE_SIGNUP } from "@/utils";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "header header header header"
    "container container container container"
    "footer footer footer footer";
  grid-template-rows: 85px 1fr 150px;
`;

export const Layout = ({
  children,
  handleFlowNav,
  handleFlowBackNav,
  activeStep,
  showAlert,
  flowCurrIndex,
  flowArrLength,
  email,
}) => {
  return (
    <Wrapper>
      <Head>
        {/*-- Global site tag (gtag.js) --*/}
        {activeStep === STEP_FIVE_SIGNUP &&
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=AW-10800426050"></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; 
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date()); 
                gtag('config', 'AW-10800426050');`
              }}
            />

            {/*-- Event snippet for Sign-up conversion page */}
            <script dangerouslySetInnerHTML={{
              __html: `gtag('event', 'conversion', {'send_to': 'AW-10800426050/9pD4CN-5loUDEMLYhZ4o'})`
            }} />
          </>
        }
      </Head>
      <SignupHeader activeStep={activeStep} />
      {children}
      <SignupFooter
        activeStep={activeStep}
        handleFlowBackNav={handleFlowBackNav}
        handleFlowNav={handleFlowNav}
        showAlert={showAlert}
        flowCurrIndex={flowCurrIndex}
        flowArrLength={flowArrLength}
        email={email}
      />
    </Wrapper>
  );
};
