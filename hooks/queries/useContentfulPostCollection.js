import { gql } from "@apollo/client";
import { contentfulClient } from "api/config";

export const useContentfulPostCollection = async () => {
  const { data } = await contentfulClient.query({
    query: gql`
      query {
        postCollection(order: date_DESC) {
          items {
            title
            date
            slug
            image {
              url
            }
            author {
              name
            }
          }
        }
      }
    `,
  });

  return data.postCollection.items;
};
