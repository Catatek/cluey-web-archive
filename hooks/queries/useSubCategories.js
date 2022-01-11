import { gql } from "@apollo/client";
import client from "api/config";

export async function useSubCategories() {
  const { data } = await client.query({
    query: gql`
      query {
        subCategories {
          name
          id
          image
        }
      }
    `,
  });
  return data.subCategories;
}
