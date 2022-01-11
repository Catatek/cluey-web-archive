import { theme } from "@/theme/styles";
import styled from "styled-components";
import { SettingTitle } from "@/settings/styles";
// import { useRecoilValue } from "recoil";
// import { userDataAtom } from "@/store";
import withAuth from "HOC/withAuth";
import { Text } from "@/shared-components";
// import Image from "next/image";
// import { useRouter } from "next/router";
import Link from "next/link";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  margin-top: 20px;
  box-sizing: border-box;
`;

// const privacySettingsArr = [
//   {
//     title: "Allow additional information sharing with business partners",
//     text: "Laborum dolore perferendis sapiente ut soluta quibusdam nisi eveniet. Explicabo perferendis quia officia eum odit accusamus. Et et asperiores. Laborum dolore perferendis sapiente ut soluta quibusdam nisi eveniet. Explicabo perferendis quia officia eum odit accusamus. Et et asperiores. ",
//     value: "allow_sharing_businessPartners",
//   },
//   {
//     title: "Allow email communications from Cluey",
//     text: "Laborum dolore perferendis sapiente ut soluta quibusdam nisi eveniet. Explicabo perferendis quia officia eum odit accusamus. Et et asperiores. ",
//     value: "allow_email_comunications",
//   },
//   {
//     title: "Allow personalization based on your identity",
//     text: "Laborum dolore perferendis sapiente ut soluta quibusdam nisi eveniet. Explicabo perferendis quia officia eum odit accusamus. Et et asperiores. Sapiente ut soluta quibusdam nisi.",
//     value: "allow_personalization_based",
//   },
// ];

const PrivacySecurity = () => {
  // const user = useRecoilValue(userDataAtom);
  // const { settings, id } = user;
  // const router = useRouter();
  return (
    <Wrapper>
      <Container>
        <Column>
          <SettingTitle MDisplay={"none"}>Privacy & Security</SettingTitle>
          <Text>
            We’re working on this, but in the meantime, please visit our{" "}
            <Link style={{ textDecoration: "none" }} href="/privacy-policy">
              Privacy Policy
            </Link>
            !
          </Text>
          {/* <Formik
              enableReinitialize
              initialValues={settings}
              onSubmit={async (values) => {
                try {
                  const res = await useUpdateUserPrivacy(id, values);
                  if (res) {
                    // ADD SUCCESS GLOBAL MESSAGE BOX
                  } else {
                    // ADD ERROR HANDLING GLOBAL MESSAGE BOX
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              {({ handleSubmit, values, setFieldValue }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    {privacySettingsArr.map((key, index) => (
                      <>
                        <Row
                          width
                          style={{
                            justifyContent: "space-between",
                            marginTop: 30,
                          }}
                          key={index}
                        >
                          <Label Subtitle>{key.title} </Label>
                          <Input
                            checkbox
                            checked={values[key.value]}
                            type="checkbox"
                            onChange={() => {
                              setFieldValue(key.value, !values[key.value]);
                            }}
                          />
                        </Row>
                        <Column style={{ width: 500 }}>
                          <StyledText greyText>{key.text}</StyledText>
                        </Column>
                      </>
                    ))}
                    <Button type="submit" style={{ marginTop: 40 }}>
                      SAVE CHANGES
                    </Button>
                  </form>
                );
              }}
            </Formik> */}
        </Column>
      </Container>
    </Wrapper>
  );
};
export default withAuth(PrivacySecurity);
