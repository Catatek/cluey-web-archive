import useSWR from "swr";
import { swrClient } from "api/config";

export const useGetNewsByPortfolio = () => {
  const fetcher = (query) => swrClient(query);

  const { data, error, isValidating } = useSWR(
    QUERYuseGetNewsByPortfolio,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );
  return { data, isValidating };
};

const QUERYuseGetNewsByPortfolio = `
query {
    getNews {
      source {
        name
      }
      author
      title
      description
      url
      urlToImage
      publishedAt
      content
    }
  }
    `;
