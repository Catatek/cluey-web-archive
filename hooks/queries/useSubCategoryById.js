import { gql } from "@apollo/client";
import client from "api/config";

export async function useSubCategoryById(id) {
  const { data } = await client.query({
    query: gql`
    query {
        subCategoryById(id: "${id}") {
          name
          id
          subSubCategory {
            name
            id
            brands {
              id
              name
              type
              slug
              brand_sub_type
              brand_url
              brand_logo_url
              brand_tags {
                id
                tag_name
                color_tag
              }
              reactions {
                up_votes
                down_votes
              }
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
      
    `,
  });
  return data.subCategoryById;
}
