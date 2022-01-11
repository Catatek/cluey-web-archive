import styled from "styled-components";
import { Column, NavLink } from "@/shared-components";
import { theme } from "@/theme/styles";
import { TitleBase } from "@/theme/index";
import { Button } from "@/theme/index";
import { useRouter } from "next/router";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1000000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 500ms;
  opacity: 1;
`;

const Div = styled.div`
  border-radius: 12px;
  width: 500px;
  height: auto;
  box-shadow: 0 16px 24px 0 rgba(0, 0, 0, 0.08);
  background-color: rgb(30, 77, 69);
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  padding: 24px 0;
  border-radius: 12px;
  overflow: auto;
  scrollbar-width: none;
  @media (max-width: ${theme.CLUEY_SIZE_FULL_MOBILE}) {
    width: 320px;
  }
`;

const StyledColumn = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${theme.CLUEY_SIZE_FULL_MOBILE}) {
    width: 95%;
  }
`;

const Title = styled(TitleBase)`
  font-family: ${theme.CLUEY_INTER};
  text-align: center;
  font-size: 22px;
  line-height: 1.3;
  color: ${theme.CLUEY_WHITE};
`

const TextBase = styled.p`
  font-family: ${theme.CLUEY_INTER};
  font-weight: ${theme.CLUEY_LIGHT};
  text-align: center;
`

const TextDescription = styled(TextBase)`
  margin: 0 0 20px 0;
  color: ${theme.CLUEY_WHITE};
  letter-spacing: -0.16px;
  font-size: 14px;
  line-height: 1.5;
`
const TextAccount = styled(TextBase)`
  color: ${theme.CLUEY_GREY};
  letter-spacing: -0.12px;
  font-size: 12px;
`

const StyledImage = styled.div`
  background: ${(props) => `no-repeat center / cover url(${props.logo})`};
  height: 120px;
  width: 120px;
  border: 1px solid ${theme.CLUEY_GRAY};
  border-radius: 50%;
`

export const Modal = ({ brand }) => {
  const { name, brand_logo_url } = brand;
  const router = useRouter();
  return (
    <Backdrop>
      <Div>
        <Column align="center" justify="center">
          <StyledImage logo={brand_logo_url}/>
        </Column>
        <StyledColumn>
          <Title>
            {`Want full access to ${name}'s brand profile?`}
          </Title>
          <TextDescription>
            Cluey users can react to brands, discover personal impact footprints
            by adding brands to their household, and access other features for
            thousands of brands.
          </TextDescription>
          <Button
            style={{ backgroundColor: "#4ebb7b", color: "FFF", width: "100%" }}
            onClick={() => router.push("/signup")}
          >
            YES, CREATE A FREE ACCOUNT
          </Button>
          <TextAccount>
            Have an account?&nbsp;
            <NavLink
              src={"/login"}
              text={"Login here"}
              color={theme.CLUEY_WHITE}
              fontSize={"12px"}
              decoration={"underline"}
            ></NavLink>
          </TextAccount>
        </StyledColumn>
      </Div>
    </Backdrop>
  );
};
