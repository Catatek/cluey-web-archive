import styled from "styled-components";
import Image from "next/image";
import { theme } from "@/theme/styles";
import Link from "next/link";
import { useIntercom } from "react-use-intercom";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "@/store";

const Wrapper = styled.div`
  width: 100%;
  background: #fafbfc;
  grid-area: footer;
  display: flex;
  align-items: center;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  width: 90%;
  margin: 30px auto;
  justify-content: space-between;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    justify-content: revert;
    gap: 20px;
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const Row = styled.div`
  display: flex;
`;

const StyledImg = styled.div`
  width: 22px;
  cursor: pointer;
  height: 22px;
  border-radius: 5px;
  transition: background-color ease-in 0.5s;
  opacity: 0.5;
  &:hover {
    background-color: ${theme.CLUEY_DARK_GREEN};
  }
`;

const Label = styled.p`
  font-family: Inter;
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
  color: ${theme.CLUEY_DARK_GREY};
  margin-right: 60px;
  cursor: pointer;
`;

const socialMediaArr = [
  {
    src: `/images/cluey-facebook-icon-grey.png`,
    alt: "Facebook",
    link: "https://www.facebook.com/ClueyConsumer",
  },
  {
    src: `/images/cluey-instagram-icon-grey.png`,
    alt: "instagram",
    link: "https://www.instagram.com/clueyconsumer",
  },
  {
    src: `/images/cluey-pinterest-icon-grey.png`,
    alt: "pinterest",
    link: "https://pinterest.com/clueyconsumer",
  },
  {
    src: `/images/cluey-linkedin-icon-grey.png`,
    alt: "linkedin",
    link: "https://www.linkedin.com/company/cluey-consumer",
  },
];

export const Footer = () => {
  const { showMessages, update } = useIntercom();
  const user = useRecoilValue(userDataAtom);
  const { first_name, email } = user;
  const date = new Date();
  const year = date.getFullYear();

  const handlerProps = () => {
    update({ name: first_name, email });
    showMessages();
  };

  return (
    <Wrapper>
      <Container>
        <Row>
          <Label>&copy; {year} Cluey Consumer, Inc.</Label>
          <Link href="/privacy-policy">
            <Label>Privacy Policy</Label>
          </Link>
          <Label onClick={handlerProps}>Contact Us</Label>
        </Row>
        <Row>
          {socialMediaArr.map((key, index) => {
            return (
              <a href={key.link} key={index} target="_blank">
                <Row style={{ marginRight: 10 }}>
                  <StyledImg>
                    <Image
                      src={key.src}
                      height={22}
                      width={22}
                      alt={key.alt}
                      layout="responsive"
                    />
                  </StyledImg>
                </Row>
              </a>
            );
          })}
        </Row>
      </Container>
    </Wrapper>
  );
};
