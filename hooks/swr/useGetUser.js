import useSWR from "swr";
import { swrClient } from "api/config";

export const useGetUser = () => {
  const fetcher = (query) => swrClient(query);
  const { data, error, isValidating, mutate } = useSWR(QUERYgetUser, fetcher, {
    revalidateOnFocus: false,
  });
  return { data, isValidating, mutate };
};

const QUERYgetUser = `
query {
  user {
    id
    first_name
    last_name
    email
    prefs{
      social_issues
      environmental_issues
      political_issues
      political_affiliation
      zip_code
      age
      gender
    }
    settings{
      allow_sharing_businessPartners
      allow_email_comunications
      allow_personalization_based
    }
    profile_completion{
      my_personal_values
      react_five_brands
      brands_my_kitchen
      brands_my_bathroom
      brands_laundry_room
      cluey_extension
    }
  }
}
`;
