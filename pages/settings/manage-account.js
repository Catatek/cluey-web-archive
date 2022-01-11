import { Button } from "@/theme/index";
import { theme } from "@/theme/styles";
import { useState } from "react";
import styled from "styled-components";
import { SettingTitle, Label, Line } from "@/settings/styles";
import * as yup from "yup";
import { Formik } from "formik";
import { ShowMessage } from "@/components";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "@/store";
import withAuth from "HOC/withAuth";
import { useUpdatePassword, useUpdateUser } from "@/mutations";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 100%;
  max-width: 365px;
  height: 36px;
  padding-left: 12px;
  box-sizing: border-box;
  border-radius: 4px;
  border: solid 1px ${theme.CLUEY_GREY};
  border: ${(props) => (props.error ? "1px solid red" : `solid 1px ${theme.CLUEY_GREY}`)};
  &:focus {
    outline: none;
  }
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    height: 32px;
    width: 85%;
  }
`;

const LabelError = styled.p`
  font-size: 12px;
  font-weight: ${theme.CLUEY_LIGHT};
  color: ${theme.CLUEY_PURE_RED};
  position: relative;
`;

const SmallText = styled.p`
  width: 324px;
  font-family: ${theme.CLUEY_INTER};
  font-size: 12px;
  line-height: 1.42;
  letter-spacing: -0.12px;
  text-align: left;
  color: ${theme.CLUEY_MEDIUM_GREY};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ManageAccount = () => {
  const user = useRecoilValue(userDataAtom);

  const { first_name, last_name, email, id, prefs } = user;

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertPassword, setShowAlertPassword] = useState(false);
  const [messageData, setMessageData] = useState("");
  const [messageType, setMessageType] = useState("");

  const onSubmit = async (values) => {
    setShowAlert(false);
    values.prefs = prefs;

    const res = await useUpdateUser(id, values);

    if (res) {
      setShowAlert(true);
    } else {
      //TODO///
    }
  };
  const onSubmitPass = async (values) => {
    setShowAlertPassword(false);
    const res = await useUpdatePassword(id, values);
    if (res === "Password changed successfully") {
      setShowAlertPassword(true);
      setMessageType("success");
      setMessageData("Password changed successfully");
    } else {
      setShowAlertPassword(true);
      setMessageType("error");
      setMessageData("Password do not match");
    }
  };

  const validationSchema = yup.object().shape({
    first_name: yup
      .string()
      .min(3, "First Name must have a minimun of 3 characters")
      .required("First Name is required"),
    last_name: yup
      .string()
      .min(2, "Last Name must have a minimun of 2 characters")
      .required("Last Name is required"),
    email: yup
      .string()
      .email("It must be an email")
      .required("Email is required"),
  });

  const validationPassSchema = yup.object().shape({
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
        "Passwords require a minimum of 8 characters, at least one letter, and one number."
      )
      .required("New Password is required"),
    currentPassword: yup.string().required("Current Password is required"),
  });

  return (
    <Wrapper>
      <Container>
        <Column>
          <SettingTitle MDisplay={"none"}>Account Settings </SettingTitle>
          {showAlert && (
            <ShowMessage message={"Your changes were successfully saved."} />
          )}
          <Formik
            enableReinitialize
            initialValues={{
              first_name,
              last_name,
              email,
            }}
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
                <Form onSubmit={handleSubmit}>
                  <Label>
                    <p>First Name</p>
                    <Input
                      type="text"
                      name="first_name"
                      value={values.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.first_name && errors.first_name}
                    />
                    <LabelError>
                      {errors.first_name && touched.first_name
                        ? errors.first_name
                        : ""}
                    </LabelError>
                  </Label>
                  <Label>
                    <p>Last Name</p>
                    <Input
                      type="text"
                      name="last_name"
                      value={values.last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.last_name && errors.last_name}
                    />
                    <LabelError>
                      {errors.last_name && touched.last_name
                        ? errors.last_name
                        : ""}
                    </LabelError>
                  </Label>
                  <Label>
                    <p>Email</p>
                    <Input
                      type="text"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && errors.email}
                    />
                    <LabelError>
                      {errors.email && touched.email ? errors.email : ""}
                    </LabelError>
                  </Label>
                  <Button
                    type="submit"
                    style={{ marginTop: 40 }}
                    disabled={disabledButton}
                  >
                    SAVE CHANGES
                  </Button>
                </Form>
              );
            }}
          </Formik>
          <Line
            style={{
              margin: "25px 0",
              position: "relative",
              width: "100%",
            }}
          />
          <Formik
            enableReinitialize
            initialValues={{
              currentPassword: "",
              password: "",
            }}
            validationSchema={validationPassSchema}
            onSubmit={onSubmitPass}
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
                <Form onSubmit={handleSubmit}>
                  <Label>
                    <p>Current Password</p>
                    <Input
                      type="password"
                      name="currentPassword"
                      value={values.currentPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.currentPassword && errors.currentPassword}
                    />
                    <LabelError>
                      {errors.currentPassword && touched.currentPassword
                        ? errors.currentPassword
                        : ""}
                    </LabelError>
                  </Label>

                  {showAlertPassword && messageType === "error" && (
                    <ShowMessage message={messageData} type={"error"} />
                  )}
                  {showAlertPassword && messageType === "success" && (
                    <ShowMessage message={messageData} />
                  )}

                  <Label>
                    <p>New Password</p>
                    <Input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && errors.password}
                    />
                    <LabelError>
                      {errors.password && touched.password
                        ? errors.password
                        : ""}
                    </LabelError>
                    <SmallText small>
                      Passwords require a minimum of 8 characters, at least one
                      letter, and one number.
                    </SmallText>
                  </Label>
                  <Button
                    type="submit"
                    disabled={disabledButton}
                    style={{ marginTop: 20, marginBottom: 50 }}
                  >
                    CONFIRM
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Column>
      </Container>
    </Wrapper>
  );
};

export default withAuth(ManageAccount);
