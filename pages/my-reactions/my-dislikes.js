import { Column } from "@/shared-components";
import { BrandCard } from "components/brand-card";
import withAuth from "HOC/withAuth";
import { useGetUserReactionsToAllBrands } from "@/queries";
import { TabNav } from "@/app-layout";

const MyDisLikes = () => {
  const { data, isValidating, mutate } = useGetUserReactionsToAllBrands();

  const downVotedBrands =
    !isValidating && data?.userReactionsToBrands?.downVotedBrands;

  return (
    <>
      <TabNav />
      <Column>
        {downVotedBrands &&
          downVotedBrands.length > 0 &&
          downVotedBrands.map((key) => {
            key.currentReaction = 0;
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

export default withAuth(MyDisLikes);

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
