import { useContentfulAboutCluey } from "@/queries";
import styled from "styled-components";
import { SubtitleBase } from "@/theme/index";
import { Column, Div } from "@/shared-components";
import { AboutNavigation } from "@/components";
import remark from "remark";
import html from "remark-html";
import { theme } from "@/theme/styles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px 0;
  width: 95%;
  height: auto;
  box-sizing: border-box;
`;

const PostMarkup = styled.div`
  font-family: ${theme.CLUEY_INTER};
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    color: #333;
  }
  img {
    max-width: 300px;
  }
`;

const Subtitle = styled(SubtitleBase)`
  font-size: 18px;
  font-weight: 500;
`

const Faqs = ({ faqs }) => {
  return (
    <Container>
      <AboutNavigation />
      <Column align={"start"}>
        {faqs &&
          faqs.length > 0 &&
          faqs.map((key, index) => (
            <Div key={index} margin={"10px 0 0"} maxWidth={`700px`}>
              <Subtitle>
                {key.question}
              </Subtitle>
              <PostMarkup
                dangerouslySetInnerHTML={{ __html: key.answer }}
              ></PostMarkup>
            </Div>
          ))}
      </Column>
    </Container>
  );
};

export async function getStaticProps() {
  try {
    const res = await useContentfulAboutCluey();
    let faqStructuredData = [];
    await res.faqsCollection.items.map(async (faq) => {
      const markdownAnswer = await remark().use(html).process(faq.answer);
      return faqStructuredData.push({
        question: faq.question,
        answer: markdownAnswer.toString(),
      });
    });

    return {
      props: {
        faqs: faqStructuredData,
        meta: {
          title:
            "FAQ's | Cluey Consumer | Look under the hood of your favorite brands",
        },
      },
    };
  } catch (err) {
    console.log(err);
    return { props: { notFound: true } };
  }
}

export default Faqs;
