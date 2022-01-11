import { theme } from "@/theme/styles";
import styled from "styled-components";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

const Wrapper = styled.div`
  width: 100%;
  padding: 48px 0;
  background-color: ${theme.CLUEY_TEAL};
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Subtitle = styled.h2`
  font-family: ${theme.CLUEY_TEST_FINANCIER_DISPLAY};
  font-size: 42px;
  font-weight: ${theme.CLUEY_BOLD};
  margin-left: 10px;
  color: ${theme.CLUEY_DARK_GREEN};
  text-align: center;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 33px;
  }
`;

const Grid = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-template-rows: auto;
  grid-gap: 30px;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    width: 90%;
  }
  @media (max-width: 375px) {
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
    width: 95%;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${(props) => props.marginright || "0px"};
  padding: 24px;
  box-sizing: border-box;
  justify-content: space-between;
  width: 75%;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    padding: 10px;
  }
`;

const CardWrapper = styled.div`
  border-radius: 20px;
  box-shadow: 0 2px 18px -3px rgba(0, 0, 0, 0.25);
  background-color: ${theme.CLUEY_WHITE};
  display: flex;
  box-sizing: border-box;
  height: 200px;
  cursor: pointer;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    height: 130px;
  }
`;

const CardText = styled.p`
  font-family: ${theme.CLUEY_INTER};
  font-size: 16px;
  font-weight: ${theme.CLUEY_SEMI_BOLD};
  line-height: 1.44;
  letter-spacing: -0.16px;
  color: ${theme.CLUEY_DARK};
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 13px;
    letter-spacing: -0.13px;
    line-height: 1.29;
  }
`;

const DateText = styled.p`
  font-family: ${theme.CLUEY_INTER};
  font-size: 16px;
  line-height: 1.44;
  letter-spacing: -0.16px;
  color: ${theme.CLUEY_GREY};
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: 13px;
    line-height: 1.21;
    letter-spacing: -0.13px;
  }
`;

const StyledImage = styled(Image)`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 280px;
  height: 200px;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    height: 130px;
    width: 200px;
  }
  @media (max-width: 375px) {
    width: 175px;
  }
`;

const Card = ({ src, text, date, slug }) => (
  <Link href={`/blog/${slug}`}>
    <CardWrapper>
      <ImageWrapper>
        <StyledImage src={src} layout="fill" objectFit="cover" />
      </ImageWrapper>
      <Column>
        <CardText>{text}</CardText>
        <DateText>{moment(date).startOf("day").fromNow()} </DateText>
      </Column>
    </CardWrapper>
  </Link>
);

export const Posts = ({ postCollection }) => {
  return (
    <Wrapper>
      <Container>
        <Row style={{ marginBottom: 25 }}>
          <Subtitle center>
            <Image
              src="/images/cluey-newspapper-icon.png"
              height={30}
              width={30}
              alt="Your Name"
            />
            &nbsp; The Latest from the Cluey Blog
          </Subtitle>
        </Row>
      </Container>
      <Grid>
        {postCollection &&
          postCollection.length > 0 &&
          postCollection.map((key, index) => {
            return (
              <Card
                key={index}
                src={key.image.url}
                text={key.title}
                date={key.date}
                slug={key.slug}
              />
            );
          })}
      </Grid>
    </Wrapper>
  );
};
