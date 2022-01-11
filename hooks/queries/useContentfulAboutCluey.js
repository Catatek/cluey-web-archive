import { gql } from "@apollo/client";
import { contentfulClient } from "api/config";

export const useContentfulAboutCluey = async () => {
  const { data } = await contentfulClient.query({
    query: gql`
      query {
        aboutCluey(id: "3zzXXufDZfZwnE9nnTWY9K") {
          teamMembersCollection {
            items {
              avatar {
                url
              }
              title
              name
            }
          }
          faqsCollection {
            items {
              question
              answer
            }
          }
          howWeRateAndDataDisclaimer {
            body {
              json
              links {
                entries {
                  inline {
                    sys {
                      id
                    }
                  }
                  block {
                    sys {
                      id
                    }
                  }
                }
                assets {
                  block {
                    sys {
                      id
                    }
                    url
                    title
                    width
                    height
                    description
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return data.aboutCluey;
};
