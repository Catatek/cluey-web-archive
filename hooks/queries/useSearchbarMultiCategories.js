import { gql } from "@apollo/client";
import client from "api/config";

export async function useSearchbarMultiCategories() {
  const { data } = await client.query({
    query: gql`
      query {
        userPortfolioWithCategories {
          name
          type
          id
          subTypes {
            id
            name
            type
          }
        }
      }
    `,
  });
  return data.userPortfolioWithCategories;
}
