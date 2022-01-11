import styled from "styled-components";
import Link from "next/link";
import { theme } from "@/theme/styles";
import { useFormikContext, Field, ErrorMessage } from "formik";
import { TitleContainer } from "../title-container";
import { Input, Error } from "./styles";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.CLUEY_TAN};
  grid-area: container;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  margin: 16px 4px;
  font-family: ${theme.CLUEY_INTER};
  font-size: 11px;
  font-weight: ${theme.CLUEY_LIGHT};
  line-height: 1.36;
  letter-spacing: -0.11px;
  text-align: center;
  color: ${theme.CLUEY_MEDIUM_GREY};
  max-width: 300px;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    margin: 10px 0;
  }
`;

const NavLink = styled.a`
  cursor: pointer;
  color: ${theme.CLUEY_MEDIUM_GREY};
  font-family: ${theme.CLUEY_INTER};
  font-size: 11px;
  font-weight: ${theme.CLUEY_LIGHT};
  line-height: 1.36;
  text-decoration: underline;
`;

export const SignupFour = () => {
  const { values, errors, touched } = useFormikContext();
  return (
    <Wrapper>
      <TitleContainer
        src="/images/signup-party-popper.png"
        title={`Hooray! Your impact assessment is ready, ${values.firstName}.`}
        text="Enter a password to save your progress."
      />
      <Column>
        <Input
          style={{ marginTop: 30 }}
          placeholder="Password"
          type="password"
          name="password"
          error={touched.password && errors.password}
        />
        <Error>
          <ErrorMessage name="password" />
        </Error>
        <Label>
          Passwords require a minimum of 8 characters, at least one letter, and
          one number.
        </Label>
      </Column>
      <Row>
        <Field
          style={{ marginRight: 2, cursor: "pointer" }}
          type="checkbox"
          name="terms"
          defaultChecked={false}
        />
        <Label>
          I agree to the Cluey &nbsp;
          <a href="/privacy-policy" target="_blank">
            <NavLink>Privacy Policy.</NavLink>
          </a>
        </Label>
      </Row>
    </Wrapper>
  );
};
