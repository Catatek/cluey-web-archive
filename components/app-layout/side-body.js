import styled from "styled-components";
import { theme } from "@/theme/styles";
import { useContentfulPostCollection, useGetNewsByPortfolio } from "@/queries";
import { useEffect, useState } from "react";
import { NewsItem } from "components";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  grid-area: side;
  overflow-y: scroll;
  display: ${({ show }) => (show ? "block" : "none")};
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE_LG}) {
    display: none;
  }
`;

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Div = styled.div`
  width: 100%;
  border-radius: 20px;
  border: solid 1px ${theme.CLUEY_GRAY};
`;

const StyledTitle = styled.h2`
  font-family: ${theme.CLUEY_INTER};
  font-size: 18px;
  font-weight: ${theme.CLUEY_LIGHT};
  line-height: 1.94;
  letter-spacing: -0.18px;
  color: ${theme.CLUEY_DARK_GREEN};
  margin-left: 20px;
`;

// TODO REFACTOR

export const SideBody = ({ show }) => {
  const [posts, setPosts] = useState([]);

  const { data, isValidating } = useGetNewsByPortfolio();

  useEffect(async () => {
    const resPost = await useContentfulPostCollection();
    setPosts(resPost);
  }, []);

  const news = !isValidating && data?.getNews;

  return (
    <Wrapper show={show}>
      <Container>
        <Div>
          <StyledTitle>Your Brands in the News</StyledTitle>
          {news &&
            news.length > 0 &&
            news.map((key, index) => {
              return (
                <NewsItem
                  sideBody
                  key={index}
                  title={key.title}
                  date={key.publishedAt}
                  src={key.urlToImage}
                  href={key.url}
                  external
                />
              );
            })}
        </Div>
        <Div style={{ marginTop: 30 }}>
          <StyledTitle>Latest from Cluey</StyledTitle>
          {posts &&
            posts.length > 0 &&
            posts.map((key, index) => {
              return (
                <NewsItem
                  sideBody
                  key={index}
                  title={key.title}
                  date={key.date}
                  src={key.image.url}
                  href={key.slug}
                />
              );
            })}
        </Div>
      </Container>
    </Wrapper>
  );
};
