import styled from "styled-components";
import withAuth from "HOC/withAuth";
import Image from "next/image";
import { SecondaryNav } from "@/app-layout";
import { Column, Row, LabelError } from "@/shared-components";
import { theme } from "@/theme/styles";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Line, Label } from "@/settings/styles";
import { Button } from "@/theme/index";
import { useUpdateUserPrefs } from "@/mutations";
import { myValues_data } from "constants/my-values-data";
import { Tooltip, ShowMessage } from "@/components";
import { useState } from "react";
import { useGetUser } from "@/queries";

const Container = styled.div`
  margin: 10px 20px;
  width: 80%;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 95%;
  }
  @media (max-width: ${theme.CLUEY_SIZE_FULL_MOBILE}) {
    width: 90%;
  }
`;

const Input = styled.input`
  width: 365px;
  padding: 11px 20px 10px 15px;
  border-radius: 4px;
  border: solid 1px ${theme.CLUEY_GREY};
  border: ${(props) => (props.error ? "1px solid red" : `solid 1px ${theme.CLUEY_GREY}`)};
  &:focus {
    outline: none;
  }
`;
const Select = styled.select`
  width: 400px;
  padding: 8px 20px 10px 15px;
  border-radius: 4px;
  border: solid 1px ${theme.CLUEY_GREY};
  border: ${(props) => (props.error ? "1px solid red" : `solid 1px ${theme.CLUEY_GREY}`)};
  &:focus {
    outline: none;
  }
`;

const RadioBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  border-radius: 2px;
`;

const RadioButtonLabel = styled.label`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${theme.CLUEY_WHITE};
  border: 1px solid ${theme.CLUEY_LIGHT_SHADE_GRAY};
`;

const RadioButton = styled(Field)`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    background: ${theme.CLUEY_LIGHT_SHADE_GRAY};
    &::after {
      display: block;
      color: ${theme.CLUEY_WHITE};
      width: 12px;
      height: 12px;
      margin: 4px;
    }
  }
  &:checked + ${RadioBtnWrapper} {
    background: ${theme.CLUEY_LINK_GREEN};
    border: 2px solid ${theme.CLUEY_LINK_GREEN};
  }
  &:checked + ${RadioButtonLabel} {
    background: ${theme.CLUEY_LINK_GREEN};
    border: 1px solid ${theme.CLUEY_LINK_GREEN};
    &::after {
      display: block;
      color: ${theme.CLUEY_WHITE};
      width: 12px;
      height: 12px;
      margin: 4px;
    }
  }
`;

const TextBase = styled.p`
  font-family: ${theme.CLUEY_INTER};
`

const TextTitle = styled(TextBase)`
  margin: 0px 10px 0px;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-weight: ${theme.CLUEY_SEMI_BOLD};
    font-size: 15px;
  }
`

const TextName = styled(TextBase)`
  font-size: 14px;
  letter-spacing: -0.14px;
  margin: 10px 0;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 13px;
  }
`

const TextLabel = styled(TextBase)`
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 14px;
  }
`

const TextHelp = styled(TextBase)`
  color: ${theme.CLUEY_DARK_GREY};
  margin: 0px 10px 0px 0px;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 14px;
  }
`

const validationSchema = yup.object().shape({
  social_issues: yup.string().required("A radio option is required"),
  environmental_issues: yup.string().required("A radio option is required"),
  political_issues: yup.string().required("A radio option is required"),
  political_affiliation: yup.string().required("A radio option is required"),
  gender: yup.string().nullable(),
  age: yup.string().required(),
  zip_code: yup.string().required("Your Zip Code is required").length(5),
});

const linksArr = [{ title: "My Values", link: "/my-values" }];

export const MyValues = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { data, isValidating, mutate } = useGetUser();

  const prefs = !isValidating && data?.user.prefs;

  const onSubmit = async (values) => {
    const res = await useUpdateUserPrefs(values);
    mutate();
    res && setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const ages = ["18-24", "25-34", "35-44", "45-54", "55-64", "65 and older"];

  return (
    <Formik
      enableReinitialize
      initialValues={prefs}
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
        setFieldValue,
      }) => {
        return (
          <Row height={"100%"}>
            <Container>
              <Form onSubmit={handleSubmit}>
                {myValues_data.map((key, index) => (
                  <Column key={index} margin={"30px 0"} align={"flex-start"}>
                    <Row>
                      <TextTitle>
                        {key.title}
                      </TextTitle>
                      <Tooltip
                        width={"320px"}
                        height={"50px"}
                        transform={"translateX(-0%)"}
                        message={
                          "Lorem ipsum dolor sit amet consectetur adipiscing elit a elementum nibh."
                        }
                      >
                        <Image
                          src="/images/cluey-question-circle.svg"
                          height={20}
                          width={20}
                        />
                      </Tooltip>
                    </Row>
                    {key.choices.map((choice, index) => (
                      <RadioBtnWrapper key={index}>
                        <RadioButton
                          type="radio"
                          name={key.value}
                          onChange={(e) => {
                            setFieldValue(key.value, +e.target.value);
                          }}
                          value={choice.value}
                        />
                        <RadioButtonLabel />
                        <TextName>
                          {choice.name}
                        </TextName>
                      </RadioBtnWrapper>
                    ))}
                  </Column>
                ))}
                <Line style={{ margin: "20px 0" }} />
                {showAlert && (
                  <ShowMessage
                    margin
                    message={"Your changes were successfully saved."}
                  />
                )}
                <Label>
                  <TextLabel>Zip Code</TextLabel>
                  <Input
                    name="zip_code"
                    value={values.zip_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.zip_code && errors.zip_code}
                  />
                  <LabelError>
                    {errors.zip_code && touched.zip_code ? errors.zip_code : ""}
                  </LabelError>
                </Label>
                <Label>
                  <TextLabel>Age</TextLabel>
                  <Select
                    name="age"
                    value={values.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.age && errors.age}
                  >
                    <option value=""></option>
                    {ages.map((key, index) => (
                      <option key={index}>{key}</option>
                    ))}
                  </Select>
                  <LabelError>
                    {errors.age && touched.age ? errors.age : ""}
                  </LabelError>
                </Label>
                <Label>
                  <TextLabel>Gender</TextLabel>
                  <Select
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.gender && errors.gender}
                  >
                    <option value=""></option>
                    <option value="Woman">Woman</option>
                    <option value="Man">Man</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer to self-describe">
                      Prefer to self-describe
                    </option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </Select>
                  <LabelError>
                    {errors.gender && touched.gender ? errors.gender : ""}
                  </LabelError>
                </Label>
                <Row margin={"30px 0px"}>
                  <TextHelp>
                    Why do you need to know this?
                  </TextHelp>
                  <Tooltip
                    width={"320px"}
                    height={"50px"}
                    transform={"translateX(-0%)"}
                    message={
                      "This optional information helps us provide you with more relevant search results and recommendations on Cluey."
                    }
                  >
                    <Image
                      src="/images/cluey-question-circle.svg"
                      height={20}
                      width={20}
                    />
                  </Tooltip>
                </Row>

                <Button type="submit" style={{ marginBottom: 30 }}>
                  SAVE CHANGES
                </Button>
              </Form>
            </Container>
          </Row>
        );
      }}
    </Formik>
  );
};

export default withAuth(MyValues);

export async function getStaticProps() {
  return {
    props: {
      meta: {
        title:
          "My Values | Cluey Consumer | Look under the hood of your favorite brands",
      },
    },
  };
}
