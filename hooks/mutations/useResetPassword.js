import { gql } from "@apollo/client";
import client from "api/config";

export const useResetPassword = async (token, pass) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation {
        changePasswordByForgot(input:{
          token:"${token}"
          newPassword:"${pass}"
        }) 
      }
      `,
  });
  return data.changePasswordByForgot;
};
