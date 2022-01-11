import { Column } from "@/shared-components";
import { BrandCard } from "components/brand-card";
import withAuth from "HOC/withAuth";
import { useGetUserReactionsToAllBrands } from "@/queries";
import { TabNav } from "@/app-layout";

const MyLikes = () => {
  const { data, isValidating, mutate } = useGetUserReactionsToAllBrands();

  const upvotedBrands =
    !isValidating && data?.userReactionsToBrands?.upvotedBrands;

  return (
    <>
      <TabNav />
      <Column>
        {upvotedBrands &&
          upvotedBrands.length > 0 &&
          upvotedBrands.map((key) => {
            key.currentReaction = 1;
            return (
              <BrandCard
                key={key.id}
                brandData={key}
                squareCard
                mutateHandler={mutate}
                dashboard={true}
              />
            );
          })}
      </Column>
    </>
  );
};

export default withAuth(MyLikes);

export async function getStaticProps() {
  return {
    props: {
      meta: {
        title:
          "My Reactions | Cluey Consumer | Look under the hood of your favorite brands",
      },
    },
  };
}
