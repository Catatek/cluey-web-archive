import styled from "styled-components";
import { theme } from "@/theme/styles";
import { useFormikContext, ErrorMessage } from "formik";
import { Input, Error } from "./styles";
import { TitleContainer } from "../title-container";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.CLUEY_TAN};
  grid-area: container;
`;

const Container = styled.div`
  width: 90%;
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 40px;
  gap: 20px;
  width: 100%;
  max-width: 950px;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    justify-content: center;
    gap: 70px;
    flex-direction: column;
    align-items: center;
  }
`;

export const SignupOne = () => {
  const { errors, touched } = useFormikContext();
  return (
    <Wrapper>
      <Container>
        <TitleContainer
          src="/images/signup-hand.png"
          title=" Hello, fellow consumer! Welcome to Cluey."
        />
        <Row>
          <Input
            placeholder="Enter Your First Name"
            name="firstName"
            error={touched.firstName && errors.firstName}
          />
          <Input
            name="lastName"
            placeholder="Enter Your Last Name"
            error={touched.lastName && errors.lastName}
          />
          <Input
            name="email"
            placeholder="Enter Your Email"
            error={touched.email && errors.email}
          />
        </Row>
        <Error>
          <ErrorMessage name="email" />
        </Error>
      </Container>
    </Wrapper>
  );
};
