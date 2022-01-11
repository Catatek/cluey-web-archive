import { swrClient } from "api/config";
import useSWR from "swr";

export const useGetBrandProfile = (brandId, token) => {
  const QUERYbrandProfile = `
      query {
        isBrandInUserPortfolio(brand_id: "${brandId}") {
          message
        }
        reactedBrandByUser(where: { id: "${brandId}" }) {
          id
          name
          currentReaction
        }
        brand(where: { id: "${brandId}" }) {
            reactions_count
            portfolio_total_count
            reactions {
              up_votes
              down_votes
            }
            people_score
            planet_score
            political_impact{
              indivs_dems
              indivs_repubs
              pacs_dems
              pacs_repubs
              total
              democratic_total
              republican_total
            }
          }
       }
   `;

  const fetcher = (query) => swrClient(query);
  const { data, error, mutate, isValidating } = useSWR(
    token ? QUERYbrandProfile : null,
    fetcher,
    { revalidateOnFocus: false }
  );
  return { data, mutate, error, isValidating };
};
