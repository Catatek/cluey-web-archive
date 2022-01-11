import {
  HowItWorks,
  Posts,
  Layout,
  Splash,
  TopReactedToBrands,
} from "@/components";
import { contentful_home_query } from "@/queries";
import { contentfulClient } from "../api/config";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = ({ postCollection }) => {
  const router = useRouter();

  useEffect(() => {
    const { query } = router;
    if (query && Object.keys(query).length !== 0) {
      localStorage.setItem("utm_params", JSON.stringify(query));
    }
  }, [router]);

  return (
    <Layout>
      <Splash
        title="Look under the hood of your favorite brands"
        body="Cluey shows you the impact that your household brands have on people, the planet, and politics."
        btnText="SEE MY IMPACT"
      />
      <HowItWorks />
      <TopReactedToBrands />
      <Posts postCollection={postCollection} />
      <Splash
        title="Try Cluey for yourself"
        body="Enter your email to start your personalized impact assessment of your household brands, and see if they align with your values."
        btnText="SEE MY IMPACT"
        type="bottom"
      />
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await contentfulClient.query({
    query: gql`
      ${contentful_home_query}
    `,
  });

  return {
    props: {
      postCollection: res.data.postCollection.items,
    },
    revalidate: 60,
  };
}

export default Home;
