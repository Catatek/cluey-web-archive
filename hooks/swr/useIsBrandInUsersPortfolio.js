import { swrClient } from "api/config";
import useSWR from "swr";

export const useIsBrandInUsersPortfolio = (brandId, isSignup) => {
  const QUERYisBrandInUsersPortfolio = `
      query {
        isBrandInUserPortfolio(brand_id: "${brandId}") {
          message
        }
      }
   `;
  const fetcher = (query) => swrClient(query);

  const { data, error, mutate, isValidating } = useSWR(
    !isSignup ? QUERYisBrandInUsersPortfolio : null,
    fetcher
  );
  return { data, mutate, error, isValidating };
};
