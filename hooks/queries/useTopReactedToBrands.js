import { gql } from "@apollo/client";
import client from "api/config";

export async function useTopReactedToBrands({ filter }) {
  const { type, comparator, field } = filter;
  const { data } = await client.query({
    query: gql`
      query {
        topReactedToBrands(filter: {type: "${type}", comparator:"${comparator}", field: "${field}"}) {
          id
          name
          type
          slug
          brand_sub_type
          brand_url
          brand_logo_url
          reactions {
            up_votes
            down_votes
          }
          reactions_count
          brand_tags {
            id
            tag_name
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
    `,
  });
  return data.topReactedToBrands;
}
