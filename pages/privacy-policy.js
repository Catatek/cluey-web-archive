import styled from "styled-components";
import { theme } from "@/theme/styles";
import { Layout } from "@/components";
import remark from "remark";
import html from "remark-html";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const PostBody = styled.div`
  width: 80%;
  max-width: 1000px;
  height: auto;
  padding: 60px;
  box-sizing: border-box;
  border-radius: 12px;
  border: solid 1px ${theme.CLUEY_PASTEL_BLUE};
  background-color: ${theme.CLUEY_WHITE};
  margin: 0 auto;
  margin-bottom: 60px;
  @media (max-width: 500px) {
    width: 90%;
    padding: 20px;
  }
`;

const PostMarkup = styled.div`
  font-family: Montserrat;
  line-height: 1.5;
  h1 {
    margin-top: 32px;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    color: ${theme.CLUEY_DARK};
  }
  h2 {
    margin-top: 32px;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    color: ${theme.CLUEY_DARK};
  }
  h3 {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: ${theme.CLUEY_DARK};
  }
  p {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    color: ${theme.CLUEY_DARK};
  }
`;

const PrivacyPolicy = ({ post }) => {
  return (
    <Layout white>
      <PostBody>
        <PostMarkup dangerouslySetInnerHTML={{ __html: post }}></PostMarkup>
      </PostBody>
    </Layout>
  );
};

async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export async function getStaticProps() {
  const postsDirectory = join(process.cwd(), "markdown");
  const fullPath = join(postsDirectory, `privacy-policy.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);
  const post = await markdownToHtml(content || "");

  return {
    props: {
      post,
    },
  };
}

export default PrivacyPolicy;
