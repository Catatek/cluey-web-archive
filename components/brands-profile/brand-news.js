import styled from "styled-components";
import { SubtitleBase } from "@/theme/index";
import { Row } from "@/shared-components";
import { theme } from "@/theme/styles";
import { NewsItem } from "components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 100px;
  grid-gap: 0 25px;
  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const Subtitle = styled(SubtitleBase)`
  font-size: 20px;
  font-weight: ${theme.CLUEY_LIGHT};
  color: ${theme.CLUEY_DARK_GREEN};
  letter-spacing: -0.21px;
  line-height: 1.29;
`

export const BrandNews = ({ brandName, news }) => {
  return (
    <>
      <Row>
        <Subtitle>
          {brandName} in the news
        </Subtitle>
      </Row>
      <Grid>
        {news &&
          news.length > 0 &&
          news.map((key, index) => (
            <NewsItem
              key={index}
              title={key.title}
              date={key.publishedAt}
              src={key.urlToImage}
              href={key.url}
              external
            />
          ))}
      </Grid>
    </>
  );
};
