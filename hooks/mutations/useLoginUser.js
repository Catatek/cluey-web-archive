import { gql } from "@apollo/client";
import client from "api/config";

export const useLoginUser = async (email, password) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation {
        login(input:{
          email:"${email}"
          password:"${password}"
        }) { ok, message }
      }
      `,
  });

  return data.login;
};
