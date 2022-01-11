import { gql } from "@apollo/client";
import client from "api/config";

export const useRemoveBrandFromUserPortfolio = async (dataBrand) => {
 const { brand_id, brand_type } = dataBrand;

  const { data } = await client.mutate({
    mutation: gql`
    mutation{
      removeBrandFromUserPortfolio(input:{
        brands:[{brand_id:"${brand_id}", brand_type:"${brand_type}" }]
      }){
        name
      }
    }
      `,
  });
  return data.removeBrandFromUserPortfolio;
};
