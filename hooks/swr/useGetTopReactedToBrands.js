import useSWR from "swr";
import { swrClient } from "api/config";

export const useGetTopReactedToBrands = ({ filter }) => {
  const { type, comparator, field } = filter;

  const QUERYtopReactedToBrands = `
  query {
    topReactedToBrands(filter: {type: "${type}", comparator:"${comparator}", field: "${field}"}) {
      id
      name
      type
      slug
      brand_sub_type
      brand_url
      brand_logo_url
      reactions {
        up_votes
        down_votes
      }
      reactions_count
      brand_tags {
        id
        tag_name
        color_tag
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

  const { data, error, isValidating } = useSWR(
    QUERYtopReactedToBrands,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );
  return { data, isValidating };
};
