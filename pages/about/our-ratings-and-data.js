import styled from "styled-components";
import { AboutNavigation } from "@/components";
import { useContentfulAboutCluey } from "@/queries";
import { documentToReactComponents, renderOptions } from "@/utils";
import { PostMarkup } from "@/theme/index";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px 0;
  width: 95%;
  height: auto;
  box-sizing: border-box;
`;

const PrivacyPolicy = ({ ourRatingsAndData }) => {
  return (
    <Container>
      <AboutNavigation />
      <PostMarkup>
        {documentToReactComponents(
          ourRatingsAndData.json,
          renderOptions(ourRatingsAndData.links)
        )}
      </PostMarkup>
    </Container>
  );
};

export async function getStaticProps() {
  const res = await useContentfulAboutCluey();
  return {
    props: {
      ourRatingsAndData: res.howWeRateAndDataDisclaimer.body,
      meta: {
        title:
          "Ratings & Data | Cluey Consumer | Look under the hood of your favorite brands",
      },
    },
  };
}

export default PrivacyPolicy;
