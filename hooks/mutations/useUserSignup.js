import { gql } from "@apollo/client";
import client from "api/config";

export const useUserSignup = async (user) => {
  const { firstName, lastName, email, password, brands } = user;
  let newArr = [...brands];
  newArr.forEach((v) => {
    delete v.name;
  });
  const brandsString = JSON.stringify(newArr).replace(/"(\w+)"\s*:/g, "$1:");

  const { data } = await client.mutate({
    mutation: gql`
      mutation {
        createUser(input:{
          first_name:"${firstName}"
          last_name:"${lastName}"
          email:"${email}"
          password:"${password}"
          brands:${brandsString}
        }) {
          id
          first_name
          last_name
          email
          token
        }
      }
      `,
  });

  return data.createUser;
};
