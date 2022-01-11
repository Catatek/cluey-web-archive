import { gql } from "@apollo/client";
import client from "api/config";

export const useUpdatePassword = async (id, pass) => {
  const { password, currentPassword } = pass;

  const { data } = await client.mutate({
    mutation: gql`
      mutation {
        changePassword(input:{
          id:"${id}"
          password:"${password}"
          currentPassword:"${currentPassword}"
         
        }) 
      }
      `,
  });
  return data.changePassword;
};
