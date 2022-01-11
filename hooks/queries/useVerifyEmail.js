import { gql } from "@apollo/client";
import client from "api/config";

export const useVerifyEmail = async (email) => {
  const { data } = await client.mutate({
    mutation: gql`
      query {
        verifyEmail(email: "${email}")
      }
      `,
  });

  return data.verifyEmail;
};
