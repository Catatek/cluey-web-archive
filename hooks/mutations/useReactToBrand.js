import { gql } from "@apollo/client";
import client from "api/config";

export const useReactToBrand = async ({ id, reaction }) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation {
        reactToBrand(input:{
          reaction: ${reaction}
          brand_id:"${id}"
        }){
          message
        }
      }
      `,
  });
  return data.reactToBrand;
};
