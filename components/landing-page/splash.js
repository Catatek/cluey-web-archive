import Image from "next/image";
import styled from "styled-components";
import { theme } from "@/theme/styles";
import { TextBase as Text, SubtitleBase as Subtitle, Button, Input } from "@/theme/index";
import { Formik } from "formik";
import { useSubscribeUserToKlaviyoList } from "@/mutations";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  background: ${theme.CLUEY_TAN};
  position: relative;
  display: flex;
  align-items: center;
  padding: 50px 0 65px;
  overflow: hidden;
  @media (max-width: 980px) {
    height: 535px;
  }
  @media (max-width: 500px) {
    height: 100%;
  }
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  @media (max-width: 1080px) {
    width: 90%;
  }
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  width: 577px;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 1080px) {
    width: 425px;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1080px) {
    align-items: flex-start;
    flex-direction: column;
  }
  @media (max-width: 780px) {
    width: 100%;
  }
`;

const ClueyIcons = styled.div`
  position: absolute;
  right: 0;
  @media (max-width: 1420px) {
    right: -100px;
  }
  @media (max-width: 1402px) {
    right: -150px;
  }
  @media (max-width: 1380px) {
    right: -200px;
  }
  @media (max-width: 1200px) {
    right: -300px;
  }
  @media (max-width: 790px) {
    right: -350px;
    height: 455px;
    width: 590px;
  }
  @media (max-width: 650px) {
    right: -430px;
    height: 455px;
    width: 590px;
  }
  @media (max-width: 584px) {
    right: -500px;
    height: 455px;
    width: 590px;
  }
  @media (max-width: 500px) {
    margin-top: 70px;
    position: initial;
    width: 555px;
    left: 0;
    margin-right: 60px;
  }
  @media (max-width: 420px) {
    width: 480px;
  }

  ${({ bottomSplash }) =>
    bottomSplash &&
    `
    position: absolute;
      right: 0;
    @media (max-width: 980px) {
   
      right: -400px;
    }
    @media (max-width: 870px) {

      right: -500px;
    }
    @media (max-width: 780px) {

      right: -470px;
    }
  `}
`;

const Form = styled.form`
  width: 100%;
  @media (max-width: 780px) {
    text-align: center;
  }
`;

export const Splash = ({ title, body, btnText, type }) => {
  const router = useRouter();
  return (
    <Wrapper>
      <Container>
        <Column>
          <Subtitle landing center margin="0 0 25px 0">
            {title}
          </Subtitle>
          <Text>{body}</Text>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values, { setErrors, setStatus }) => {
              const utm_params = localStorage.getItem("utm_params");
              try {
                const res = await useSubscribeUserToKlaviyoList(values.email, {
                  prevType: "",
                  nextType: "3-see_my_impact",
                  source: utm_params,
                });
                if (res.ok) {
                  router.push({
                    pathname: "/signup",
                    query: { email: values.email },
                  });

                  setStatus({ submitted: true });
                } else  {
                  console.log(res.message);
                }
              } catch (err) {
                console.log(err);
              }
            }}
          >
            {({ handleSubmit, status, values, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <Row style={{ marginTop: 25, marginBottom: 25 }}>
                  <Input
                    style={{ marginRight: 10 }}
                    small
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    required
                  />
                  <Button margin large splashMobileBtn type="submit">
                    {status && status.submitted ? "Added!" : btnText}
                  </Button>
                </Row>
              </Form>
            )}
          </Formik>
        </Column>
        <ClueyIcons bottomSplash={type == "bottom"}>
          <Image
            src="/images/cluey-splash-icons-2.png"
            height={535}
            width={690}
            alt="Cluey Icons"
            layout="intrinsic"
          />
        </ClueyIcons>
      </Container>
    </Wrapper>
  );
};
