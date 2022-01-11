import { gql } from "@apollo/client";
import client from "api/config";

export const useSubscribeUserToKlaviyoList = async (email, options) => {
  const { prevType, nextType, source } = options;
  const formattedSource = source ? cleanUtmParams(source).replace(/"(\w+)"\s*:/g, "$1:") : "{}";
  const { data } = await client.mutate({
    mutation: gql`
      mutation {
        subscribeUserToKlaviyoList(
          input: {
            email: "${email}"
            prevType: "${prevType}"
            nextType: "${nextType}"
            source: ${formattedSource}
          }
        ) {
          ok, message
        }
      }
    `,
  });

  return data.subscribeUserToKlaviyoList;
};

const cleanUtmParams = (source) => {
  source = JSON.parse(source);
  const list = new Set(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']);
  for (let prop of Object.keys(source)) {
    if (!list.has(prop)) {
      delete source[prop];
    }
  }
  return JSON.stringify(source);
}