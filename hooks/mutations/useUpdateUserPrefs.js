import { gql } from "@apollo/client";
import client from "api/config";

export const useUpdateUserPrefs = async (prefs) => {
  const {
    age,
    environmental_issues,
    gender,
    political_affiliation,
    political_issues,
    social_issues,
    zip_code,
  } = prefs;

  const { data } = await client.mutate({
    mutation: gql`
      mutation {
        updateUserPreferences(input:{
          age:"${age}"
          environmental_issues:${environmental_issues}
          gender:"${gender}"
          political_affiliation:${political_affiliation}
          political_issues:${political_issues}
          social_issues:${social_issues}
          zip_code:"${zip_code}"
        }) {
          id
        }
      }
      `,
  });

  return data.updateUserPreferences;
};
