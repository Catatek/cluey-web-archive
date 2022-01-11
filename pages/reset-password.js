import styled, { css } from "styled-components";
import Image from "next/image";
import { theme } from "@/theme/styles";
import { TextBase, TitleBase, Button, Input } from "@/theme/index";
import "normalize.css";
import { Footer } from "@/components";
import { Formik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useResetPassword } from "hooks/mutations/useResetPassword";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.CLUEY_TAN};
`;

const Row = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    flex-direction: column;
    height: 0;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginWrapper = styled.div`
  width: 520px;
  height: 350px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.25);
  background-color: ${theme.CLUEY_WHITE};
  margin: 165px 0;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 360px;
    height: 334px;
    padding: 20px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledImg = styled.div`
  width: 231px;
  height: 77px;
  margin: 76px auto;
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
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 156px;
    height: 53px;
  }
`;

const validationPassSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
      "Passwords require a minimum of 8 characters, at least one letter, and one number."
    ),
});

export const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;

  const onSubmit = async (values) => {
    localStorage.setItem("authorization", token);
    const { password } = values;

    const res = await useResetPassword(token, password);
    if (res === "Password changed successfully") {
      router.push("/login");
    }
  };

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
            <Formik
              enableReinitialize
              initialValues={{
                password: "",
              }}
              validationSchema={validationPassSchema}
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
                  <LoginWrapper>
                    <LoginContainer>
                      <LoginTitle>Password Reset</LoginTitle>
                      <LoginText>
                        Enter a new password to login to your account.
                      </LoginText>
                      <Form onSubmit={handleSubmit}>
                        <Input
                          style={{ width: "95%", margin: "20px 0 10px 0" }}
                          type="password"
                          name="password"
                          placeholder="New Password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.password && errors.password}
                        />
                        <LoginText label>
                          Passwords require a minimum of 8 characters, at least
                          one letter, and one number.
                        </LoginText>
                        <Button
                          type="submit"
                          style={{ width: "100%", marginTop: 20 }}
                          disabled={disabledButton}
                        >
                          LOGIN
                        </Button>
                      </Form>
                    </LoginContainer>
                  </LoginWrapper>
                );
              }}
            </Formik>
          </Column>
        </Row>
      </Wrapper>
      <Footer hidden={true} />
    </>
  );
};

export default ResetPassword;
