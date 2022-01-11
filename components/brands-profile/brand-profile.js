import styled from "styled-components";
import Link from "next/link";
import { theme } from "@/theme/styles";
import { Tag, TitleBase, TextBase } from "@/theme/index";
import {
  Row,
  Column,
  OutlineBtn,
  OutlineNavBtn,
} from "@/shared-components";
import Image from "next/image";
import { Line } from "@/settings/styles";
import { BrandSummary } from "@/components";
import { useReactToBrand } from "@/mutations";
import { useGetBrandProfile } from "@/queries";
import { Multiselect } from "components/searchbar/multiselect";
import { useEffect, useState } from "react";
import { Modal } from "./modal";
import { tagData } from "utils/tag-data";
import { Tooltip } from "components/tooltip";

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 22px;
  background-color: #f2f2f2;
  width: 100%;
  height: 42px;
`;

const Title = styled(TitleBase)`
  font-family: ${theme.CLUEY_INTER};
  margin: 20px 0 0 0;
  font-size: 26px;
  letter-spacing: -0.26px;
  line-height: 27px;
`

const TextParent = styled(TextBase)`
  font-size: 14px;
  color: ${theme.CLUEY_DARK_GREY};
  margin: 8px 0 0;
  letter-spacing: -0.14px;
  line-height: 1.93;
`

const Text = styled(TextBase)`
  font-size: 14px;
  margin: 0;
  font-weight: 600;
`

const Nav = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 15px 0;
`

const NavLink = styled.a`
  cursor: pointer;
  font-family: ${theme.CLUEY_INTER};
  margin: 0 0 0 15px;
  font-size: 12px;
  font-weight: ${theme.CLUEY_LIGHT};
  color: ${theme.CLUEY_DARK_GREY};
`

const StyledImage = styled.div`
  background: ${(props) => `no-repeat center / cover url(${props.logo})`};
  height: 150px;
  width: 150px;
  border: 1px solid ${theme.CLUEY_GRAY};
  border-radius: 50%;

  @media (max-width: ${theme.CLUEY_SIZE_MOBILE_INTEMEDIATE_SCREEN}) {
    height: 100px;
    width: 100px;
  }
`

export const BrandProfile = ({ staticBrandProps, showModal }) => {
  const {
    brand_logo_url,
    name,
    id,
    brand_url,
    brand_tags,
    people_score,
    planet_score,
    parentCompany,
    portfolio_total_count: static_portfolio_total_count,
    reactions: static_reactions,
    political_impact,
    scores_see_more,
  } = staticBrandProps;
  
  const [seeMore, setSeeMore] = useState(false);

  let parentCompanyArr = [];
  parentCompany &&
    parentCompany.map((company) => {
      parentCompanyArr.push(` ${company.name}`);
    });
  const token =
    typeof window !== "undefined" && localStorage.getItem("authorization");

  const {
    data: brandProfileData,
    mutate: mutateBrandProfileData,
    isValidating: brandProfileDataValidating,
  } = useGetBrandProfile(id, token);

  const currentReaction =
    !brandProfileDataValidating && brandProfileData
      ? brandProfileData.reactedBrandByUser[0].currentReaction
      : null;

  const isBrandInPortfolio =
    !brandProfileDataValidating && brandProfileData
      ? brandProfileData.isBrandInUserPortfolio.message === "exists"
      : false;

  const brandProfileDynamicData =
    !brandProfileDataValidating && brandProfileData
      ? brandProfileData.brand
      : { portfolio_total_count: 0, reactions: { up_votes: 0, down_votes: 0 } };

  const handleUserReaction = async (reaction) => {
    await useReactToBrand({ id, reaction });
    mutateBrandProfileData();
  };

  return (
    <>
      <Nav>
        <OutlineNavBtn src={token ? "/discover" : "/"}>
          <Image
            src="/images/cluey-chevron-left-green.svg"
            alt="Picture of the author"
            width={12}
            height={12}
            layout="intrinsic"
            priority
          />
        </OutlineNavBtn>
        <Link href={token ? "/discover" : "/"}>
          <NavLink>{"Discover"}</NavLink>
        </Link>
      </Nav>
      <Row justify={"space-between"} align={"center"}>
        <a href={brand_url && brand_url} target="_blank">
          <StyledImage logo={brand_logo_url}/>
        </a>
        {token && (
          <Column>
            <OutlineBtn
              margin={"0 0 10px"}
              height={"35px"}
              width={"200px"}
              type={"addRemove"}
              bgColor={isBrandInPortfolio && `${theme.CLUEY_LIME_GREEN}`}
              border={
                isBrandInPortfolio
                  ? `${theme.CLUEY_LIME_GREEN}`
                  : `${theme.CLUEY_DARK_GREY}`
              }
              color={
                isBrandInPortfolio
                  ? `${theme.CLUEY_USER_AVATAR}`
                  : `${theme.CLUEY_DARK_GREY}`
              }
            >
              {isBrandInPortfolio
                ? "Remove from Household"
                : "Add to Household"}
              <Multiselect
                dataBrand={staticBrandProps}
                id={id}
                mutate={mutateBrandProfileData}
                isBrandInPortfolio={isBrandInPortfolio}
              />
            </OutlineBtn>

            <BtnContainer>
              <OutlineBtn
                width={"90px"}
                height={"30px"}
                border={
                  currentReaction === 1 ? `${theme.CLUEY_USER_AVATAR}` : "none"
                }
                color={`${theme.CLUEY_DARK_GREY}`}
                bgColor={`${theme.CLUEY_WHITE}`}
                type={"reaction"}
                reactionType={1}
                handleUserReaction={handleUserReaction}
              >
                <Image
                  src="/images/thumbsup.png"
                  height={18}
                  width={18}
                  priority
                />
                &nbsp; Like
              </OutlineBtn>
              <OutlineBtn
                width={"90px"}
                height={"30px"}
                border={currentReaction === 0 ? `${theme.CLUEY_RED}` : "none"}
                color={`${theme.CLUEY_DARK_GREY}`}
                bgColor={`${theme.CLUEY_WHITE}`}
                type={"reaction"}
                reactionType={0}
                handleUserReaction={handleUserReaction}
              >
                <Image
                  src="/images/thumbsdown.png"
                  height={18}
                  width={18}
                  priority
                />
                &nbsp; Dislike
              </OutlineBtn>
            </BtnContainer>
          </Column>
        )}
      </Row>
      <Column align="flex-start">
        <Title>
          {name}
        </Title>
        <TextParent>
          Parent Company: {parentCompanyArr.join()}
        </TextParent>
        <Row gap={"10px"} margin="8px 0">
          {brand_tags &&
            brand_tags.length > 0 &&
            brand_tags.map((key, index) => {
              const { white, toolTip } = tagData(key.tag_name);

              return (
                <Tooltip message={toolTip} transform={"-25%"} width={"100px"}>
                  <Tag
                    key={index}
                    white={white}
                    backgroundColor={key.color_tag ? key.color_tag : "#dcfffd"}
                  >
                    {key.tag_name}
                  </Tag>
                </Tooltip>
              );
            })}
        </Row>
        <Row justify="space-around" gap={"12px"} align={"center"}>
          <Text>
            {brandProfileDynamicData.portfolio_total_count ||
              static_portfolio_total_count}{" "}
            <span style={{ fontWeight: 300 }}>Household Users</span>
          </Text>
          <Text>
            {brandProfileDynamicData.reactions.up_votes ||
              static_reactions.up_votes}
          </Text>
          <Image src={"/images/thumbsup.png"} height={21} width={21} />
          <Text>
            {brandProfileDynamicData.reactions.down_votes ||
              static_reactions.down_votes}
          </Text>
          <Image src={"/images/thumbsdown.png"} height={21} width={21} />
        </Row>
        <Line margin={"10px 0"} />
        <BrandSummary
          type={"profile"}
          peopleImpact={people_score}
          planetImpact={planet_score}
          politicalImpact={political_impact}
          isBrandProfile={true}
          scoresSeeMore={scores_see_more}
          clickSeeMore={setSeeMore}
          showSeeMore={seeMore}
        />
        <Line margin={"15px 0"} />
      </Column>
      {showModal && <Modal brand={staticBrandProps} />}
    </>
  );
};
