import useSWR from "swr";
import { swrClient } from "api/config";

export const useGetUserFootprint = () => {
  const fetcher = (query) => swrClient(query);
  const { data, error, isValidating, mutate } = useSWR(
    QUERYgetUserFootprint,
    fetcher
  );
  return { data, isValidating, mutate };
};

const QUERYgetUserFootprint = `
query{
  userFootprint{
    people_impact
    planet_impact
    political_impact {
      total
      democratic_total
      republican_total
    }
  }
}
`;
