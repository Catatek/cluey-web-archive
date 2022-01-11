import useSWR from "swr";
import { swrClient } from "api/config";

export const useGetUserReactionsToAllBrands = () => {
  const fetcher = (query) => swrClient(query);
  const { data, error, mutate, isValidating } = useSWR(
    QUERYuserReactionsToBrands,
    fetcher
  );

  return { data, error, mutate, isValidating };
};

const QUERYuserReactionsToBrands = `
query{
  userReactionsToBrands{
    upvotedBrands{
      id
      name
      type
      slug
      brand_sub_type
      brand_url
      brand_logo_url
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
    downVotedBrands{
      id
      name
      type
      slug
      brand_sub_type
      brand_url
      brand_logo_url
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
  }
`;
