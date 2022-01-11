import { gql } from "@apollo/client";
import client from "api/config";

export const useForgotPassword = async ({ email }) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation {
        forgotPassword(input:{
          email:"${email}"
        }) { ok, message }
      }
      `,
  });
  return data.forgotPassword;
};
