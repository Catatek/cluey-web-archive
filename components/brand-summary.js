import Image from "next/image";
import styled from "styled-components";
import { TextBase } from "@/theme/index";
import { theme } from "@/theme/styles";
import { Tooltip } from "./tooltip";
import { StyledImg } from "./shared-components";
import { brandMessages, footprintMessages } from "constants/tooltip-data";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Wrapper = styled.div`
  display: flex;
  @media (max-width: ${theme.CLUEY_SIZE_TABLET}) {
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  height: 34px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 4px;

  @media (min-width: ${theme.CLUEY_SIZE_TABLET_SCREEN}) {
    margin-right: 25px;
  }

  @media (max-width: ${theme.CLUEY_SIZE_LARGE_SCREEN}) {
    margin-right: 30px;
  }

  @media (min-width: ${theme.CLUEY_SIZE_MOBILE_LG}) {
    margin-right: ${(props) => (props.dashboard ? "10px" : "20px")};
  }

  @media (min-width: ${theme.CLUEY_SIZE_BREAK_POINT}) {
    margin-right: ${(props) => (props.dashboard ? "28px" : "40px")};
  }

  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    margin-right: ${({ marginRight }) => marginRight && "0px"};
    width: 100%;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  background-color: ${theme.CLUEY_BAR_RED};
  border-radius: 4px;
  align-items: center;
  padding-right: ${(props) => props.padding};
  justify-content: ${(props) => props.align};
  color: ${theme.CLUEY_WHITE};
  font-family: ${theme.CLUEY_INTER};
  font-size: 12px;

  @media (max-width: ${theme.CLUEY_SIZE_MOBILE_SCREEN}) {
    width: 98px!important;
  }

  @media (min-width: ${theme.CLUEY_SIZE_TABLET_SCREEN}) {
    width: 155px;
  }

  @media (min-width: ${theme.CLUEY_SIZE_SMALL_SCREEN}) {
    width: 155px;
  }

  @media (min-width: ${theme.CLUEY_SIZE_LARGE_SCREEN}) {
    font-size: 11px;
    width: 130px;
  }

  @media (min-width: ${theme.CLUEY_SIZE_EXTRA_LARGE_SCREEN}) {
    width: ${(props) => props.dashboard ? "130px" : "160px"};
  }

  @media (max-width: ${theme.CLUEY_SIZE_MOBILE_LG}) {
    width: ${(props) => props.dashboard ? "150px" : "130px"};
  }

  @media (min-width: ${theme.CLUEY_SIZE_BREAK_POINT}) {
    width: ${(props) => props.dashboard ? "155px" : "130px"};
  }
`;

const Progress = styled.div`
  text-align: ${(props) => props.align};
  padding: 0 0 0 ${(props) => props.padding};
  color: ${theme.CLUEY_WHITE};
  font-family: ${theme.CLUEY_INTER};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: ${(props) => props.radius};
  border-bottom-right-radius: ${(props) => props.radius};
  width: ${(props) => props.progress}%;
  height: 25px;
  background-color: ${theme.CLUEY_BAR_BLUE};
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.align};
  @media (max-width: ${theme.CLUEY_SIZE_BREAK_POINT}) {
    padding: 0 0 0 ${(props) => props.padding};
    font-size: 10px;
  }
`;

const StatTitleContainer = styled.div`
  display: flex;
`;

const StatTitle = styled(TextBase)`
  color: ${theme.CLUEY_DARK_GREY};
  font-size: 10px;
  margin-bottom: 8px;
  width: 72px;
  @media (max-width: ${theme.CLUEY_SIZE_BREAK_POINT}) {
    font-size: 8px;
  }
  @media (max-width: ${theme.CLUEY_SIZE_FULL_MOBILE}) {
    font-size: 6px;
  }
`;

const SeeMoreInfo = styled(StatTitle)`
  color: ${theme.CLUEY_GREY};
  margin-left: 8px;
  text-decoration: underline;
  cursor: pointer;
`;

const MoreInfoPeople = styled.div`
  color: ${theme.CLUEY_MEDIUM_DARK_GREY};
  font-weight: ${theme.CLUEY_SEMI_BOLD};
  font-size: 12px;
  background: ${theme.CLUEY_WHITE};
  position: absolute;
  top: 100%;
  width: 350px;
  height: 175px;
  z-index: 1000;
  padding: 10px 16px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 0 6px 0 ${theme.CLUEY_LIGHT_GREY};
  font-family: ${theme.CLUEY_INTER};
  line-height: 18px;
  overflow: scroll;
  @media (max-width: 400px) {
    width: 250px;
  }
`;

const MoreInfoPlanet = styled(MoreInfoPeople)`
  @media (max-width: 850px) {
    left: -50%;
  }
  @media (max-width: 440px) {
    left: -80%;
  }
`;

const MoreInfoPolitical = styled(MoreInfoPeople)`
  @media (max-width: 850px) {
    left: -50%;
  }
  @media (max-width: 440px) {
    left: -80%;
  }
`;
const TextInfo = styled.p`
  font-family: ${theme.CLUEY_INTER};
  color: ${theme.CLUEY_DARK_GREY};
  font-size: 9px;
  margin: 10px 0 20px;
  line-height: 12px;
  max-width: 300px;
  word-break: break-word;
`;
const LinkToRatings = styled(TextInfo)`
  margin: 0 0 0 2px;
  padding: 0;
  display: inline;
  text-decoration: underline;
  cursor: pointer;
`;

const WrapperProgress = styled.div`
  margin-bottom: 10px;
`;

const TextMoreInfoPolitical = styled.div`
  font-family: ${theme.CLUEY_INTER};
  color: ${theme.CLUEY_DARK_GREY};
  font-size: 9px;
  margin-bottom: 4px;
  span {
    color: ${theme.CLUEY_MEDIUM_GREY};
    font-weight: ${theme.CLUEY_BOLD};
  }
`;
const ContainerProgress = styled.div`
  display: flex;
`;

const InputRate = styled.div`
  display: flex;
  padding-bottom: 10px;
  margin-top: 12px;
`;

const IconRate = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
const TextRate = styled.div`
  margin-right: 10px;
  span {
    font-weight: ${theme.CLUEY_BOLD};
    margin-left: 5px;
    font-size: 13px;
  }
`;

const StatScoreText = styled(TextBase)`
  font-size: ${(props) => (props.unrated ? "10px" : "18px")};
  color: ${theme.CLUEY_DARK};
  font-weight: ${theme.CLUEY_BOLD};
  line-height: 1;
  @media (max-width: ${theme.CLUEY_SIZE_FULL_MOBILE}) {
    font-size: ${(props) => (props.unrated ? "10px" : "14px")};
  }
`;

const PeopleImpact = ({ scoresSeeMore, show }) => {
  const {
    gri_reporting,
    sabs_reporting,
    b_corp_certification,
    sustainalytics_social_risk_score,
    hrc_inclusive_benefits,
    hrc_workforce_protections,
    hrc_corporate_social_responsibility,
    violation_tracker_employment_related_offenses,
    violation_tracker_consumer_protection_related_offenses,
    violation_tracker_Financial_offences,
    violation_tracker_healthcare_related_offenses,
    as_you_sow,
    just_capital_workers_score,
    just_capital_customers_score,
    just_capital_communities_score
  } = scoresSeeMore;

  const data = [
    {
      icon: "/images/icons-see-more/global-reporting-initiative-gri.jpg",
      text: "Reports via The Global Reporting Index:",
      data: gri_reporting,
    },
    {
      icon: "/images/icons-see-more/sasb.jpg",
      text: "Reports via The Sustainability Accounting Standards Board:",
      data: sabs_reporting,
    },
    {
      icon: "/images/icons-see-more/b-corp.jpg",
      text: "B-Corp Certified:",
      data: b_corp_certification,
    },
    {
      icon: "/images/icons-see-more/sustainalytics.jpg",
      text: "ESG Data provided by Sustainalytics. Social Risk Score:",
      data: sustainalytics_social_risk_score,
    },
    {
      icon: "/images/icons-see-more/just-capital.jpg",
      text: "Just Capital Workers Score:",
      data: just_capital_workers_score,
    },
    {
      icon: "/images/icons-see-more/just-capital.jpg",
      text: "Just Capital Customers Score:",
      data: just_capital_customers_score,
    },
    {
      icon: "/images/icons-see-more/just-capital.jpg",
      text: "Just Capital Communities Score:",
      data: just_capital_communities_score,
    },
    {
      icon: "/images/icons-see-more/hrc.jpg",
      text: "Human Rights Campaign adherence to inclusive benefits:",
      data: hrc_inclusive_benefits,
    },
    {
      icon: "/images/icons-see-more/hrc.jpg",
      text: "Human Rights Campaign adherence to workforce protections:",
      data: hrc_workforce_protections,
    },
    {
      icon: "/images/icons-see-more/hrc.jpg",
      text: "Human Rights Campaign adherence to corporate social responsibility:",
      data: hrc_corporate_social_responsibility,
    },

    {
      icon: "/images/icons-see-more/good-jobs-first.jpg",
      text: "Violation tracker data provided by Good Jobs First. Total Amount of Employee Related Offenses:",
      data: violation_tracker_employment_related_offenses,
    },
    {
      icon: "/images/icons-see-more/good-jobs-first.jpg",
      text: "Violation tracker data provided by Good Jobs First. Total Amount of Consumer Protection Related Offenses:",
      data: violation_tracker_consumer_protection_related_offenses,
    },
    {
      icon: "/images/icons-see-more/good-jobs-first.jpg",
      text: "Violation tracker data provided by Good Jobs First. Total Amount of Financial Offenses:",
      data: violation_tracker_Financial_offences,
    },
    {
      icon: "/images/icons-see-more/good-jobs-first.jpg",
      text: "Violation tracker data provided by Good Jobs First. Total Amount of Healthcare Related Offenses:",
      data: violation_tracker_healthcare_related_offenses,
    },
    {
      icon: "/images/icons-see-more/as-you-sow.jpg",
      text: "As You Sow Social Resolutions:",
      data: as_you_sow,
    },
  ];
  return (
    <MoreInfoPeople onMouseLeave ={()=> { show(false) }}>
      <TextInfo>
        We evaluate data related to a brand’s parent company(ies)’s
        transparency, current results, and commitment to change. Specifically
        for the “People Impact” score, we are looking at these areas relevant to
        a company’s social impact, including treatment of workers and suppliers,
        impacts on customers, and on communities. To learn more about our data
        partners, sources, and ratings methodology, visit         
        <Link href="/about/our-ratings-and-data">
          <LinkToRatings>"How We Rate & Data Disclaimer".</LinkToRatings>
        </Link>
      </TextInfo>
      {data.map(({ icon, text, data }) => (
        <InputRate>
          <IconRate>
            <Image src={icon} width={30} height={30} layout="fixed" />
          </IconRate>
          <TextRate>
            {text} <span>{data}</span>
          </TextRate>
        </InputRate>
      ))}
    </MoreInfoPeople>
  );
};

const PlanetImpact = ({ scoresSeeMore, show }) => {
  const {
    gri_reporting,
    sabs_reporting,
    b_corp_certification,
    as_you_sow,
    sustainalytics_environmental_score,
    cdp_climate,
    cdp_forest,
    cdp_water,
    violation_tracker_Environment_related,
    just_capital_environment_score,
  } = scoresSeeMore;

  const data = [
    {
      icon: "/images/icons-see-more/global-reporting-initiative-gri.jpg",
      text: "Reports via The Global Reporting Index:",
      data: gri_reporting,
    },
    {
      icon: "/images/icons-see-more/sasb.jpg",
      text: "Reports via The Sustainability Accounting Standards Board:",
      data: sabs_reporting,
    },
    {
      icon: "/images/icons-see-more/b-corp.jpg",
      text: "B-Corp Certified:",
      data: b_corp_certification,
    },
    {
      icon: "/images/icons-see-more/sustainalytics.jpg",
      text: "ESG Data provided by Sustainalytics. Environmental Risk Score:",
      data: sustainalytics_environmental_score,
    },
    {
      icon: "/images/icons-see-more/just-capital.jpg",
      text: "Just Capital Environmental Score:",
      data: just_capital_environment_score,
    },
    {
      icon: "/images/icons-see-more/cdp.jpg",
      text: "Carbon Disclosure Project Climate score:",
      data: cdp_climate,
    },
    {
      icon: "/images/icons-see-more/cdp.jpg",
      text: "Carbon Disclosure Project Forests score:",
      data: cdp_forest,
    },
    {
      icon: "/images/icons-see-more/cdp.jpg",
      text: "Carbon Disclosure Project Water score:",
      data: cdp_water,
    },
    {
      icon: "/images/icons-see-more/good-jobs-first.jpg",
      text: "Violation tracker data provided by Good Jobs First. Total Amount of Environment Related Offenses:",
      data: violation_tracker_Environment_related,
    },
    {
      icon: "/images/icons-see-more/as-you-sow.jpg",
      text: "As You Sow Environmental Resolutions:",
      data: as_you_sow,
    },
  ];

  return (
    <MoreInfoPlanet onMouseLeave ={()=> { show(false) }}>
      <TextInfo>
        We evaluate data related to a brand’s parent company(ies)’s
        transparency, current results, and commitment to change. Specifically
        for the “Planet Impact” score, we are looking at these areas relevant to
        a company’s environmental impact, including ecosystems & habitats
        impact, use of resources, handling of waste, and community impact.. To
        learn more about our data partners, sources, and ratings methodology,
        visit 
        <Link href="/about/our-ratings-and-data">
          <LinkToRatings>"How We Rate & Data Disclaimer".</LinkToRatings>
        </Link>
      </TextInfo>
      {data.map(({ icon, text, data }) => (
        <InputRate>
          <IconRate>
            <Image src={icon} width={30} height={30} layout="fixed" />
          </IconRate>
          <TextRate>
            {text} <span>{data}</span>
          </TextRate>
        </InputRate>
      ))}
    </MoreInfoPlanet>
  );
};

const PoliticalImpact = ({ image, politicalImpact, show }) => {
  const { indivs_dems, indivs_repubs, pacs_dems, pacs_repubs } =
    politicalImpact;

  const demsIndivsParsed = parseInt(indivs_dems);
  const repIndivsParsed = parseInt(indivs_repubs);
  const demsPacsParsed = parseInt(pacs_dems);
  const repPacsParsed = parseInt(pacs_repubs);
  const totalIndivs = demsIndivsParsed + repIndivsParsed;
  const totalPacs = demsPacsParsed + repPacsParsed;
  const percentageDemIndivs = Math.round(
    (100 * demsIndivsParsed) / totalIndivs
  );
  const percentageRepIndivs = Math.round((100 * repIndivsParsed) / totalIndivs);
  const percentageDemPacs = Math.round((100 * demsPacsParsed) / totalPacs);
  const percentageRepPacs = Math.round((100 * repPacsParsed) / totalPacs);

  const breakdownData = [
    {
      text: "Individual Contributions",
      totalInt: totalIndivs,
      contribution: `$${new Intl.NumberFormat("es-MX").format(totalIndivs)}`,
      percentageRep: percentageRepIndivs,
      percentageDem: percentageDemIndivs,
    },
    {
      text: "PAC Contributions",
      totalInt: totalPacs,
      contribution: `$${new Intl.NumberFormat("es-MX").format(totalPacs)}`,
      percentageRep: percentageRepPacs,
      percentageDem: percentageDemPacs,
    },
  ];

  return (
    <MoreInfoPolitical onMouseLeave ={()=> { show(false) }}>
      <TextInfo>
        Data provided by the center for responsive politics. Below are
        cumulative totals of two types of contributions to candidates of either
        malor political party in the last three U.S. federal election cycles:
        from a company's employees that exceed $1k (typically from high level
        executives), and from a company's corporate PAC. to learn more about our
        data partners and sources,
        <Link href="/about/our-ratings-and-data">
          <LinkToRatings>go to our ratings and data.</LinkToRatings>
        </Link>
      </TextInfo>
      {breakdownData.map(
        ({ text, contribution, percentageRep, percentageDem, totalInt }) => (
          <WrapperProgress>
            <TextMoreInfoPolitical>
              {text} <span>{contribution}</span>
            </TextMoreInfoPolitical>
            {totalInt > 0 && (
              <ContainerProgress>
                <StyledImg width={"25px"} height={"25px"}>
                  <Image
                    src={image}
                    width={30}
                    height={30}
                    layout="responsive"
                  />
                </StyledImg>
                <ProgressBar
                  style={{ marginLeft: 10 }}
                  align={percentageDem > 0 ? "space-between" : "center"}
                  padding={percentageDem === 100 ? "0" : "4px"}
                >
                  <Progress
                    progress={percentageDem}
                    padding={percentageDem > 0 ? "4px" : "0"}
                    align={percentageDem === 100 ? "center" : "left"}
                    radius={percentageDem === 100 ? "4px" : "0"}
                  >
                    {percentageDem > 0 ? `${percentageDem}%` : ""}
                  </Progress>
                  {percentageRep > 0 ? `${percentageRep}%` : ""}
                </ProgressBar>
              </ContainerProgress>
            )}
          </WrapperProgress>
        )
      )}
    </MoreInfoPolitical>
  );
};

const Stat = ({
  title,
  image,
  score,
  type,
  tooltipMessage,
  politicalImpact,
  isBrandProfile,
  scoresSeeMore,
  dashboard,
  clickSeeMore,
  showSeeMore
}) => {
  const [display, setDisplay] = useState(false);
  const getStatistics = () => {
    if (politicalImpact) {
      const percentageDem =
        (100 * politicalImpact.democratic_total) / politicalImpact.total;
      const percentageRep =
        (100 * politicalImpact.republican_total) / politicalImpact.total;
      const data = {
        percentageDem: Math.round(percentageDem),
        percentageRep: Math.round(percentageRep),
      };
      if (data.percentageDem || data.percentageRep) {
        return data;
      } else return false;
    }
  };

  const politicalStatistics = getStatistics();
  
  useEffect(()=>{
    if (!showSeeMore)
      setDisplay(showSeeMore);
  },[showSeeMore]);

  return (
    <Column marginRight={type !== "political"} dashboard={dashboard}>
      <StatTitleContainer>
        <StatTitle>{title}</StatTitle>
        {isBrandProfile && (
          <SeeMoreInfo onClick={() => {
            setDisplay(!display);
            clickSeeMore({type: type, show:!display});
            }}>
            {!display ? "See more" : "See less"}
          </SeeMoreInfo>
        )}
      </StatTitleContainer>

      <Row>
        <StyledImg width={"25px"} height={"25px"}>
          <Image src={image} width={30} height={30} layout="responsive" />
        </StyledImg>
        {type === "political" && (
          <>
            {politicalStatistics && (
              <ProgressBar
                style={{ marginLeft: 10 }}
                align={
                  politicalImpact && politicalStatistics.percentageRep === 100
                    ? "center"
                    : "space-between"
                }
                padding={
                  politicalImpact && politicalStatistics.percentageDem === 100
                    ? "0"
                    : "4px"
                }
                dashboard={dashboard}
              >
                <Progress
                  progress={
                    politicalImpact ? politicalStatistics?.percentageDem : 50
                  }
                  padding={politicalStatistics.percentageDem > 0 ? "4px" : "0"}
                  align={
                    politicalImpact && politicalStatistics.percentageDem === 100
                      ? "center"
                      : "left"
                  }
                  radius={
                    politicalImpact && politicalStatistics.percentageDem === 100
                      ? "4px"
                      : "0"
                  }
                >
                  {politicalImpact && politicalStatistics.percentageDem > 0
                    ? `${politicalStatistics?.percentageDem}%`
                    : ""}
                </Progress>
                {politicalImpact && politicalStatistics.percentageRep > 0
                  ? `${politicalStatistics?.percentageRep}%`
                  : ""}
              </ProgressBar>
            )}
            {!politicalStatistics && (
              <StatScoreText unrated={!score} style={{ marginLeft: 10 }}>
                {"N/A"}
              </StatScoreText>
            )}
          </>
        )}
        {type !== "political" && (
          <StatScoreText unrated={!score} style={{ marginLeft: 10 }}>
            {score || "N/A"}
          </StatScoreText>
        )}
      </Row>
      {isBrandProfile && display && (
        <>
          {type === "people" && showSeeMore ? (
            <PeopleImpact scoresSeeMore={scoresSeeMore} show={setDisplay} />
          ) : type === "planet" && showSeeMore ? (
            <PlanetImpact scoresSeeMore={scoresSeeMore} show={setDisplay} />
          ) : type === "political" && showSeeMore ? (
            <PoliticalImpact image={image} politicalImpact={politicalImpact} show={setDisplay} />
          ) : null}
        </>
      )}
      <Tooltip message={tooltipMessage} transform={"-25%"} width={"100px"}>
        <StyledImg width={"15px"} height={"15px"}>
          <Image
            src="/images/cluey-question-circle.svg"
            width={15}
            height={15}
            layout="intrinsic"
          />
        </StyledImg>
      </Tooltip>
    </Column>
  );
};

export const BrandSummary = ({
  type,
  peopleImpact,
  planetImpact,
  politicalImpact,
  scoresSeeMore,
  isBrandProfile = false,
  dashboard
}) => {
  const [seeMore, setSeeMore] = useState({type:'',show:false});
  return (
    <Wrapper>
      <Stat
        type="people"
        title="People Impact"
        score={peopleImpact}
        image="/images/cluey-people.png"
        tooltipMessage={
          type === "currentFootprint"
            ? footprintMessages.people
            : brandMessages.people
        }
        isBrandProfile={isBrandProfile}
        scoresSeeMore={scoresSeeMore}
        dashboard={dashboard}
        clickSeeMore={setSeeMore}
        showSeeMore={seeMore.type === "people"}
      />
      <Stat
        type="planet"
        title="Planet Impact"
        score={planetImpact}
        image="/images/cluey-planet.png"
        tooltipMessage={
          type === "currentFootprint"
            ? footprintMessages.planet
            : brandMessages.planet
        }
        isBrandProfile={isBrandProfile}
        scoresSeeMore={scoresSeeMore}
        dashboard={dashboard}
        clickSeeMore={setSeeMore}
        showSeeMore={seeMore.type === "planet"}
      />

      <Stat
        type="political"
        title="Political Impact"
        politicalImpact={politicalImpact}
        image="/images/cluey-box.png"
        tooltipMessage={
          type === "currentFootprint"
            ? footprintMessages.political
            : brandMessages.political
        }
        isBrandProfile={isBrandProfile}
        scoresSeeMore={scoresSeeMore}
        dashboard={dashboard}
        clickSeeMore={setSeeMore}
        showSeeMore={seeMore.type === "political"}
      />
    </Wrapper>
  );
};
