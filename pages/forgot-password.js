import styled, { css } from "styled-components";
import Image from "next/image";
import { theme } from "@/theme/styles";
import { TitleBase, TextBase, Button, Input, NavLink } from "@/theme/index";
import { useState } from "react";
import Link from "next/link";
import "normalize.css";
import { Footer } from "components/landing-page/footer";
import { Formik } from "formik";
import * as yup from "yup";
import { useForgotPassword } from "hooks/mutations/useForgotPassword";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 125px 0;
  background-color: ${theme.CLUEY_TAN};
  display: flex;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  @media (max-width: 870px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 870px) {
    width: 100%;
  }
`;

const StyledImg = styled.div`
  width: 231px;
  height: 77px;
  margin-bottom: 40px;
  ${(props) =>
    props.checkImg &&
    css`
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: ${theme.CLUEY_DARK_GREEN};
      display: flex;
      justify-content: center;
    `}
  @media (max-width: 870px) {
    width: 180px;
  }
`;

const LoginWrapper = styled.div`
  width: 520px;
  height: 350px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.25);
  background-color: ${theme.CLUEY_WHITE};
  @media (max-width: 870px) {
    width: 70%;
  }
  @media (max-width: 470px) {
    width: 90%;
  }
`;

const LoginContainer = styled.div`
  width: 90%;
  margin: 0px auto;
`;

const LoginTitle = styled(TitleBase)`
  font-size: 24px;
  letter-spacing: -0.24px;
  text-align: left;
  color: ${theme.CLUEY_MEDIUM_DARK_GREY};
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 22px;
  }
`;

const LoginText = styled(TextBase)`
  font-size: 18px;
  font-weight: ${theme.CLUEY_SEMI_BOLD};
  letter-spacing: -0.18px;
  text-align: left;
  color: ${theme.CLUEY_MEDIUM_DARK_GREY};
  ${(props) =>
    props.label &&
    css`
      font-size: 12px;
      line-height: 1.42;
      letter-spacing: -0.12px;
      color: ${theme.CLUEY_MEDIUM_GREY};
    `}
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 16px;
    ${(props) =>
    props.label &&
    css`
        font-size: 12px;
      `}
  }
`;

const StyledLink = styled(NavLink)`
  margin: 18px;
  display: flex;
  justify-content: center;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: ${theme.CLUEY_NORMAL};
  text-align: center;
  color: ${theme.CLUEY_DARK_GREEN};
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 14px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const LabelError = styled(TextBase)`
  font-size: 12px;
  font-weight: ${theme.CLUEY_LIGHT};
  color: ${theme.CLUEY_PURE_RED};
  position: relative;
`;

const validationEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("It must be an email")
    .required("Email is required"),
});

export const ForgotPassword = () => {
  const [page, setPage] = useState(0);
  const [emailExists, setEmailExists] = useState(false);

  const onSubmit = async (values) => {
    //API CALL
    const { ok, message } = await useForgotPassword(values);
    setPage(page + 1);
    setEmailExists(ok);
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: "",
      }}
      validationSchema={validationEmailSchema}
      onSubmit={onSubmit}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
        touched,
        isValid,
      }) => {
        const disabledButton = !isValid;
        return (
          <>
            <Wrapper>
              <Row>
                <Column>
                  <StyledImg>
                    <Image
                      src="/images/cluey-logo.png"
                      width={231}
                      height={77}
                      layout="responsive"
                    />
                  </StyledImg>
                </Column>
                <Column>
                  {page === 0 && (
                    <LoginWrapper>
                      <LoginContainer style={{ marginTop: 20 }}>
                        <LoginTitle>Forgot Your Password?</LoginTitle>
                        <LoginText>
                          Enter your email address and we will send you
                          instructions to reset your password.
                        </LoginText>
                        <Form onSubmit={handleSubmit}>
                          <Input
                            style={{ width: "95%", marginTop: 20 }}
                            type="text"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && errors.email}
                            placeholder="Email"
                          />
                          <LabelError>
                            {errors.email && touched.email ? errors.email : ""}
                          </LabelError>
                          <Button
                            type="submit"
                            style={{ width: "100%", marginTop: 15 }}
                            disabled={disabledButton}
                          >
                            RESET YOUR PASSWORD
                          </Button>
                        </Form>
                        <Link href="/login">
                          <StyledLink>Login</StyledLink>
                        </Link>
                      </LoginContainer>
                    </LoginWrapper>
                  )}
                  {page === 1 && (
                    <LoginWrapper>
                      <LoginContainer>
                        {emailExists ? (
                          <>
                            <LoginTitle>Success!</LoginTitle>
                            <LoginText>
                              Please check your email for further instructions.
                            </LoginText>
                            <StyledImg checkImg>
                              <Image
                                src="/images/cluey-check.svg"
                                width={40}
                                height={40}
                                layout="intrinsic"
                              />
                            </StyledImg>
                          </>
                        ) : (
                          <>
                            <LoginTitle>Error!</LoginTitle>
                            <LoginText>Email does not exist</LoginText>
                            <StyledImg checkImg>
                              <Image
                                src="/images/times-solid.svg"
                                width={40}
                                height={40}
                                layout="intrinsic"
                              />
                            </StyledImg>
                            <Link href="/login">
                              <StyledLink style={{ marginBottom: 76 }}>
                                Login
                              </StyledLink>
                            </Link>
                          </>
                        )}
                      </LoginContainer>
                    </LoginWrapper>
                  )}
                </Column>
              </Row>
            </Wrapper>
            <Footer hidden={true} />
          </>
        );
      }}
    </Formik>
  );
};
export default ForgotPassword;
