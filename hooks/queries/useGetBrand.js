import { gql } from "@apollo/client";
import client from "api/config";

export async function useGetBrand(where) {
  const { data } = await client.query({
    query: gql`
    query {
      brand(where: ${where}) {
        id
        name
        slug
        type
        brand_sub_type
        brand_sub_type_id
        brand_url
        brand_logo_url
        reactions_count
        portfolio_total_count
        scores_see_more{
          gri_reporting
          sabs_reporting
          b_corp_certification
          sustainalytics_social_risk_score
          hrc_inclusive_benefits
          hrc_workforce_protections
          hrc_corporate_social_responsibility
          violation_tracker_employment_related_offenses
          violation_tracker_consumer_protection_related_offenses
          violation_tracker_Financial_offences
          violation_tracker_healthcare_related_offenses
          as_you_sow
          sustainalytics_environmental_score
          cdp_climate
          cdp_forest
          cdp_water
          violation_tracker_Environment_related
          just_capital_workers_score
          just_capital_customers_score
          just_capital_environment_score
          just_capital_communities_score
        }
        parentCompany {
          name
        }

        reactions {
          up_votes
          down_votes
        }
        brand_tags {
          id
          tag_name
          color_tag
        }
        news {
          author
          title
          description
          url
          urlToImage
          publishedAt
          content
        }
        alternatives {
          id
          name
          slug
          brand_logo_url
        }
        people_score
        planet_score
        political_impact {
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
    `,
  });
  return data;
}
