import { swrClient } from "api/config";
import useSWR from "swr";

export const useGetBrandBySubType = (type) => {
  const QUERYgetBrandBySubType = `
      query {
        brandsBySubType(where:{brand_sub_type:"${type}"}){
        id
        name
        brand_logo_url
        type
        brand_sub_type
      }
  }
        `;
  const fetcher = (query) => swrClient(query);

  const { data, error, isValidating } = useSWR(QUERYgetBrandBySubType, fetcher);
  return { data, isValidating };
};
