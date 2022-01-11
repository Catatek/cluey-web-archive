import { gql } from "@apollo/client";
import client from "api/config";

export async function useGetBrands() {
  const { data } = await client.query({
    query: gql`
      query {
        brands {
          id
          name
          slug
        }
      }
    `,
  });

  return data;
}
