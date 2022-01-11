import useSWR from "swr";
import { swrClient } from "api/config";

export const useSearchBrands = (name) => {
  const fetcher = (query) => swrClient(query);

  const QUERYuseSearchBrands = `
  query {
    searchBrand(name:"${name}") {
      id
      name
      slug
      type
      brand_sub_type
      brand_logo_url
      brand_sub_type_id
    }
  }
    `;

  const { data, error, isValidating } = useSWR(
    () => (name ? QUERYuseSearchBrands : null),
    fetcher
  );
  return { data, isValidating };
};
