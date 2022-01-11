import { swrClient } from "api/config";
import useSWR from "swr";

export const useGetAllBrandIdsInPortfolio = (token) => {
  const fetcher = (query) => swrClient(query);
  const { data, error, mutate, isValidating } = useSWR(
    token ? QUERYgetAllBrandIdsInPortfolio : null,
    fetcher
  );
  return { data, mutate, error, isValidating };
};

const QUERYgetAllBrandIdsInPortfolio = `
query {
    getAllBrandIdsInPortfolio {
      brand_id
    }
  }
`;
