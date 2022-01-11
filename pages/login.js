import styled, { css } from "styled-components";
import Image from "next/image";
import { theme } from "@/theme/styles";
import { TextBase, Button, Input, NavLink } from "@/theme/index";
import "normalize.css";
import { Footer } from "@/components";
import { Formik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLoginUser } from "@/mutations";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  background-color: ${theme.CLUEY_TAN};
  display: flex;
  margin: 0 auto;
  align-items: center;
  padding: 125px 0;
  justify-content: space-evenly;
  height: 100%;
  @media (max-width: 870px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 870px) {
    width: 100%;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0px auto;
`;

const StyledImg = styled.div`
  width: 231px;
  height: 77px;
  margin-bottom: 40px;
  cursor: pointer;
  @media (max-width: 870px) {
    width: 180px;
  }
`;

const LabelError = styled(TextBase)`
  font-size: 12px;
  font-weight: ${theme.CLUEY_LIGHT};
  color: ${theme.CLUEY_PURE_RED};
  position: relative;
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

export const Login = () => {
  const router = useRouter();
  const [errorLabel, setErrorLabel] = useState(false);

  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("authorization");
    accessToken !== null && router.replace("/dashboard");
  }

  const onSubmit = async (credentials) => {
    const { email, password } = credentials;
    const { ok, message: newtoken } = await useLoginUser(email, password);
    if (ok) {
      setErrorLabel(false);
      localStorage.setItem("authorization", newtoken);
      router.push("/dashboard");
    } else {
      setErrorLabel(true);
    }
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("It must be an email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  return (
    <>
      <Wrapper>
        <Column>
          <Link href="/">
            <StyledImg>
              <Image
                src="/images/cluey-logo.png"
                width={231}
                height={77}
                layout="responsive"
              />
            </StyledImg>
          </Link>
        </Column>
        <Column>
          <Formik
            enableReinitialize
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
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
                  <Form onSubmit={handleSubmit}>
                    <Input
                      style={{
                        width: "95%",
                        borderColor: `${theme.CLUEY_DARK_GREY}`,
                      }}
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && errors.email}
                      borderColor={
                        touched.email && errors.email ? theme.CLUEY_RED : ""
                      }
                    />
                    <LabelError>
                      {errors.email && touched.email ? errors.email : ""}
                    </LabelError>
                    <Input
                      style={{
                        width: "95%",
                        borderColor: `${theme.CLUEY_DARK_GREY}`,
                        margin: " 15px 0px 0px 0px",
                      }}
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && errors.password}
                      borderColor={
                        touched.password && errors.password
                          ? theme.CLUEY_RED
                          : ""
                      }
                    />
                    <LabelError style={{ marginBottom: 15 }}>
                      {errors.password && touched.password
                        ? errors.password
                        : ""}
                    </LabelError>
                    <Button
                      type="submit"
                      style={{ width: "100%" }}
                      disabled={disabledButton}
                    >
                      LOGIN
                    </Button>
                    {errorLabel && (
                      <LabelError style={{ textAlign: "center" }}>
                        Wrong email or password
                      </LabelError>
                    )}
                    <Link href="/forgot-password">
                      <StyledLink>Forgot Password?</StyledLink>
                    </Link>
                  </Form>
                </LoginWrapper>
              );
            }}
          </Formik>
        </Column>
      </Wrapper>
      <Footer hidden={true} />
    </>
  );
};

export default Login;
