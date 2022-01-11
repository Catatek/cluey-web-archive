import { theme } from "@/theme/styles";
import { SubtitleBase as Subtitle, Input, Button } from "@/theme/index";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useIntercom } from "react-use-intercom";
import { Formik } from "formik";
import { useSubscribeUserToKlaviyoList } from "@/mutations";

const Wrapper = styled.div`
  background: ${theme.CLUEY_DARK_GREEN};
  display: flex;
  color: ${theme.CLUEY_WHITE};
  font-family: ${theme.CLUEY_INTER};
  font-weight: ${theme.CLUEY_LIGHT};
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 50px 0px;
  margin: 0 auto;
  &:last-child {
    width: 40%;
  }
  @media (max-width: 1120px) {
    flex-direction: column;
  }
  @media (max-width: 880px) {
    width: 90%;
    &:last-child {
      display: none;
    }
  }
`;

const Brand = styled.div`
  margin-bottom: 26px;
`;

const Logo = styled.div`
  margin-bottom: 20px;
`;

const Social = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 1120px) {
    justify-content: start;
  }
`;

const Links = styled.div`
  display: flex;
`;

const ListLinks = styled.div`
  margin: 0 26px;
  p {
    cursor: pointer;
  }
  @media (max-width: 1120px) {
    margin: 0 26px 0 0;
  }
`;

const Terms = styled.div`
  width: 100%;
  display: flex;
  font-size: 10px;
  margin-top: 50px;
  p {
    margin-right: 20px;
    cursor: pointer;
  }
  @media (max-width: 500px) {
    justify-content: space-between;
  }
`;

const Subscribe = styled.div`
  width: 100%;
`;

const SubscribeMobile = styled.div`
  display: none;
  margin: 30px 0;
  @media (max-width: 880px) {
    display: block;
  }
`;

const Form = styled.form`
  display: flex;
  @media (max-width: 880px) {
    flex-direction: column;
    width: 320px;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    width: 100%;
  }
`;

const StyledInput = styled(Input)`
  margin-right: 12px;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 880px) {
    margin-right: 0;
    width: 320px;
  }
`;

const Btn = styled(Button)`
  background: ${theme.CLUEY_LIGHT_GREEN};
  @media (max-width: 880px) {
    width: 100%;
    margin-top: 18px;
  }
`;

const socialMediaArr = [
  {
    src: `/images/cluey-facebook-icon-white.svg`,
    alt: "Facebook",
    link: "https://www.facebook.com/ClueyConsumer",
  },
  {
    src: `/images/cluey-instagram-icon-white.svg`,
    alt: "instagram",
    link: "https://www.instagram.com/clueyconsumer",
  },
  {
    src: `/images/cluey-pinterest-icon-white.svg`,
    alt: "pinterest",
    link: "https://pinterest.com/clueyconsumer",
  },
  {
    src: `/images/cluey-linkedin-icon-white.svg`,
    alt: "linkedin",
    link: "https://www.linkedin.com/company/cluey-consumer",
  },
];

const SubscribeForm = () => {
  return (
    <Subscribe>
      <Subtitle landing size white margin="0 0 0 0">
        Keep up with Cluey
      </Subtitle>
      <p>Sign up for our newsletter.</p>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors, setStatus }) => {
          const utm_params = localStorage.getItem("utm_params");
          try {
            const res = await useSubscribeUserToKlaviyoList(values.email, {
              prevType: "",
              nextType: "1-waitlist",
              source: utm_params,
            });
            if (res.subscribeUserToKlaviyoList) {
              setStatus({ submitted: true });
            }
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {({ handleSubmit, values, handleChange, status }) => (
          <Form onSubmit={handleSubmit}>
            <StyledInput
              small
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              name="email"
              type="email"
            />
            <Btn type="submit">
              {status && status.submitted ? "Added!" : "Signup!"}
            </Btn>
          </Form>
        )}
      </Formik>
    </Subscribe>
  );
};

export const Footer = ({ hidden }) => {
  var date = new Date();
  var year = date.getFullYear();
  const router = useRouter();
  const { showMessages } = useIntercom();

  const handleScrollNavigation = (scrollTo) => {
    router.push("/").then(() => {
      if (scrollTo === "how-it-works") {
        window.scroll({
          top: 500,
          behavior: "smooth",
        });
      } else if (scrollTo === "blog") {
        window.scroll({
          top: 2300,
          behavior: "smooth",
        });
      }
    });
  };

  return (
    <Wrapper>
      <Container>
        <Brand>
          <Logo>
            <Image
              src="/images/cluey-logo-white.png"
              height={47}
              width={140}
              alt="Cluey Logo"
              layout="fixed"
            />
          </Logo>
          <Social>
            {socialMediaArr.map((key, index) => {
              return (
                <a href={key.link} key={index} target="_blank">
                  <Image
                    key={index}
                    src={key.src}
                    height={28}
                    width={28}
                    alt={key.alt}
                  />
                </a>
              );
            })}
          </Social>
        </Brand>
        <SubscribeMobile>{!hidden && <SubscribeForm />}</SubscribeMobile>
        <Links>
          <ListLinks>
            <p onClick={() => handleScrollNavigation("how-it-works")}>
              How It Works
            </p>
            <Link href="/about/faqs">
              <p>About Us</p>
            </Link>
            <p onClick={() => handleScrollNavigation("blog")}>Blog</p>
            <Link href="/login">
              <p>Account Login</p>
            </Link>
          </ListLinks>
          <ListLinks>
            <Link href="/about/faqs">
              <p>FAQ</p>
            </Link>
            <p onClick={showMessages}>Contact Us</p>
          </ListLinks>
        </Links>
        <Terms>
          <p>&copy; {year} Cluey Consumer, Inc.</p>
          <Link href="/privacy-policy">
            <p>Privacy Policy</p>
          </Link>
          {/* <p>Terms of Use</p> */}
        </Terms>
      </Container>
      <Container>{!hidden && <SubscribeForm />}</Container>
    </Wrapper>
  );
};
