import { gql } from "@apollo/client";
import client from "api/config";

export const useAddBrandToUserPorfolio = async (dataBrand) => {

  const { brand_id, brand_type } = dataBrand;
  const { data } = await client.mutate({
    
    mutation: gql`
      mutation{
        addBrandToUserPortfolio(input:{
          brands:[{brand_id:"${brand_id}", brand_type:"${brand_type}" }]
        }){
          name
        }
      }
      `,
  });
  
  return data.addBrandToUserPortfolio;
};
