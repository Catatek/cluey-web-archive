import { swrClient } from "api/config";
import useSWR from "swr";

export const useGetUserPortfolio = ({ withCategories = true }) => {
  const fetcher = (query) => swrClient(query);
  const { data, error, mutate, isValidating } = useSWR(
    () =>
      withCategories
        ? QUERYuserPortfolioWithCategories
        : QUERYuserPortfolioWithoutCategories,
    fetcher
  );
  return { data, isValidating, mutate, error };
};

export const QUERYuserPortfolioWithoutCategories = `
query {
  userPortfolio {
    id
    name
    slug
    brand_sub_type
    brand_url
    brand_logo_url
    type
    brand_tags{
      tag_name
      color_tag
    }
    people_score
    planet_score
    political_impact{
      indivs_dems
      indivs_repubs
      pacs_dems
      pacs_repubs
      total
      democratic_total
      republican_total
    }
  }
}
`;

export const QUERYuserPortfolioWithCategories = `
  query {
    userPortfolioWithCategories {
      name
      type
      image
      subTypes {
        id
        name
        type
        brands {
          id
          name
          type
          slug
          brand_sub_type
          sub_sub_type{
            id
            name
            type
          }
          brand_url
          brand_logo_url
          reactions_count
          portfolio_total_count
          reactions {
            up_votes
            down_votes
          }
          brand_tags {
            id
            tag_name
            color_tag
          }
          currentReaction
          people_score
          planet_score
          political_impact {
            indivs_dems
            indivs_repubs
            pacs_dems
            pacs_repubs
            total
            democratic_total
            republican_total
          }
        }
      }
    }
  }
`;
