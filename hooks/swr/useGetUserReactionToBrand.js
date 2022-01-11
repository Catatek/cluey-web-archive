import useSWR from "swr";
import { swrClient } from "api/config";

export const useGetUserReactionToBrand = (id) => {
  const QUERYuseReactedBrandByUser = `
     query{
      reactedBrandByUser(where:{id: "${id}"}){
        id
        name
        currentReaction
      }
  }
`;
  const fetcher = (query) => swrClient(query);

  const { data, error, mutate } = useSWR(QUERYuseReactedBrandByUser, fetcher);
  return { data, mutate, error };
};
