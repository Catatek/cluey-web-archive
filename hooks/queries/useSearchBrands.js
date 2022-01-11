import { gql } from "@apollo/client";
import client from "api/config";

export async function useSearchBrands(name) {
  const { data } = await client.query({
    query: gql`
      query{
        searchBrand(name:"${name}") {
          id
          name
          type
          slug
          brand_sub_type
          brand_logo_url
          brand_sub_type_id
        }
      }
    `,
  });
  return data.searchBrand;
}
