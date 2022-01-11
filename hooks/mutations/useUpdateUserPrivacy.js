import { gql } from "@apollo/client";
import client from "api/config";

export const useUpdateUserPrivacy = async (id, settings) => {
  const {
    allow_email_comunications,
    allow_personalization_based,
    allow_sharing_businessPartners
  } = settings;

  const { data } = await client.mutate({
    mutation: gql`
      mutation {
        updateSettingsByUser(input:{
          allow_email_comunications: ${allow_email_comunications}
          allow_personalization_based: ${allow_personalization_based}
          allow_sharing_businessPartners: ${allow_sharing_businessPartners}
        }) {
          id
        }
      }
      `,
  });
  return data.updateSettingsByUser;
};
