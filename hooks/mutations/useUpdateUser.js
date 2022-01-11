import { gql } from "@apollo/client";
import client from "api/config";

export const useUpdateUser = async (id, user) => {
  const { first_name, last_name, email } = user;

  const { data } = await client.mutate({
    mutation: gql`
      mutation {
        updateUser(input:{
          id:"${id}"
          first_name:"${first_name}"
          last_name:"${last_name}"
          email:"${email}"
         
        }) {
          id
          first_name
          last_name
          email
    
          
        }
      }
      `,
  });
  return data.updateUser;
};
