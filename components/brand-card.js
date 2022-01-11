import styled from "styled-components";
import { theme } from "@/theme/styles";
import { Tag } from "@/theme/index";
import { BrandSummary } from "components/brand-summary";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRemoveBrandFromUserPortfolio, useReactToBrand } from "@/mutations";
import { tagData } from "utils/tag-data";

const { CLUEY_GRAY, CLUEY_INTER, CLUEY_RED, CLUEY_GREEN } = theme;

const Wrapper = styled.div`
  border-top: 1px solid ${CLUEY_GRAY};
  width: 100%;
  cursor: pointer;
  display: flex;
  font-family: ${CLUEY_INTER};

  &:first-child {
    border-top: 0px solid transparent;
  }
`;

const Index = styled.div`
  border-right: 1px solid ${CLUEY_GRAY};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
`;

const Container = styled.div`
  display: grid;
  padding: 5px;
  width: 100%;
  @media (min-width: ${theme.CLUEY_SIZE_LARGE_SCREEN}) {
    grid-template-columns: ${(props) => props.dashboard ? "225px 20% 3fr" : "225px 20% 3fr"};
  }
  @media (min-width: ${theme.CLUEY_SIZE_EXTRA_LARGE_SCREEN}) {
    grid-template-columns: ${(props) => props.dashboard ? "235px 30% 3fr" : "1fr 25% 2fr"};
  }
  @media (min-width: ${theme.CLUEY_SIZE_MOBILE_LG}) {
    grid-template-columns: ${(props) => props.dashboard ? "230px 18% 3fr" : "1fr 30% 2fr"};
  }
  @media (min-width: ${theme.CLUEY_SIZE_EXTRA_LARGE_SCREEN_MAX}) {
    grid-template-columns: ${(props) => props.dashboard ? "235px 28% 3fr" : "1fr 32% 2fr"};
  }

`;

const Column = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  @media (max-width: ${theme.CLUEY_SIZE_LARGE_SCREEN}) {
    justify-content: space-evenly;
    &:nth-child(2) {
      border-left: 1px solid ${CLUEY_GRAY};
    }
  }
  @media (min-width: ${theme.CLUEY_SIZE_LARGE_SCREEN} and max-width: ${theme.CLUEY_SIZE_EXTRA_LARGE_SCREEN}) {
    justify-content: center;
    &:last-child {
      grid-column: 1 / 3;
      border-top: 1px solid ${CLUEY_GRAY};
      margin-top: 10px;
      padding-top: 20px;
    }
  }
  @media (max-width: 920px) {
    &:nth-child(1) {
      flex-direction: row-reverse;
    }
    &:nth-child(2) {
      width: 100%;
      order: 3;
      border-left: 0;
      border-top: 1px solid ${CLUEY_GRAY};
      margin-top: 14px;
      padding-top: 14px;
    }
  }
`;
const Brand = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 12px;
  padding: 10px;
  img {
    width: 60px;
  }
  @media (max-width: ${theme.CLUEY_SIZE_LARGE_SCREEN}) {
    justify-content: start;
    p {
      margin-left: 20px;
    }
  }
  @media (max-width: 920px) {
    justify-content: start;
  }
`;
const Actions = styled.div`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0 10px;
  @media (max-width: ${theme.CLUEY_SIZE_LARGE_SCREEN}) {
    width: 100px;
    flex-direction: row;
    height: auto;
  }
`;

const Votes = styled.p`
  margin: 0;
  color: ${({ color }) => color};
  font-size: 11px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  @media (max-width: 1640px) {
    display: block;
  }
  @media (max-width: ${theme.CLUEY_SIZE_EXTRA_LARGE_SCREEN}) {
    display: flex;
  }
`;

const Line = styled.div`
  background-color: ${CLUEY_GRAY};
  width: 1px;
  height: 80px;
  margin: 0 15px;
  @media (max-width: ${theme.CLUEY_SIZE_EXTRA_LARGE_SCREEN}) {
    display: none;
  }
`;

export const BrandCard = ({
  index,
  brandData,
  showDeleteBtn = false,
  showReactionsInfo = false,
  showReactionsActions = true,
  mutateHandler,
  dashboard
}) => {
  if (!brandData) return null;

  const router = useRouter();

  const Reaction = ({ reaction, size }) => {
    const handleDelete = async ({ id, brand_sub_type }) => {
      await useRemoveBrandFromUserPortfolio({
        brand_id: id,
        brand_type: brand_sub_type,
      });
      mutateHandler && mutateHandler();
    };

    const handleUserReaction = async (reaction) => {
      await useReactToBrand({ id: brandData.id, reaction });
      mutateHandler && mutateHandler();
    };

    const reactionUp = "up";
    const reactionDown = "down";

    if (showReactionsInfo) {
      return (
        <div>
          {reaction === reactionUp ? (
            <Votes color={CLUEY_GREEN}>{`+${
              brandData.reactions ? brandData.reactions.up_votes : 0
            }`}</Votes>
          ) : (
            <Votes color={CLUEY_RED}>{`+${
              brandData.reactions ? brandData.reactions.down_votes : 0
            }`}</Votes>
          )}
          <Image
            priority
            src={
              reaction === reactionUp
                ? "/images/thumbsup.png"
                : "/images/thumbsdown.png"
            }
            width={size}
            height={size}
            layout="fixed"
          />
        </div>
      );
    }

    return (
      <div>
        <Image
          priority
          onClick={
            reaction === reactionUp
              ? () => handleUserReaction(1)
              : reaction === reactionDown
              ? () => handleUserReaction(0)
              : () => handleDelete(brandData)
          }
          src={
            reaction === reactionUp
              ? brandData.currentReaction === 1
                ? "/images/thumbsup.png"
                : "/images/faded-thumbsup.png"
              : reaction === reactionDown
              ? brandData.currentReaction === 0
                ? "/images/thumbsdown.png"
                : "/images/faded-thumbsdown.png"
              : "/images/close-icon.png"
          }
          width={size}
          height={size}
          layout="fixed"
        />
      </div>
    );
  };

  return (
    <Wrapper>
      {index >= 0 && <Index>{index + 1}</Index>}
      <Container dashboard={dashboard}>

        <Column>
          {showReactionsActions && (
            <Actions>
              <Reaction reaction="up" size={18} />
              <Reaction reaction="down" size={18} />
              {showDeleteBtn && !showReactionsInfo && (
                <Reaction reaction="close" size={14} />
              )}
            </Actions>
          )}

          <Brand onClick={() => router.push(`/brands/${brandData.slug}`)}>
            <img src={brandData.brand_logo_url} alt="" />
            <Line />
            <p>{brandData.name}</p>
          </Brand>
        </Column>

        <Column>
          <TagsContainer>
            {brandData.brand_tags &&
              brandData.brand_tags.length > 0 &&
              brandData.brand_tags.map((key, index) => {
                const { white, toolTip } = tagData(key.tag_name);
                return (
                  <div>
                    <Tag
                      key={index}
                      white={white}
                      backgroundColor={
                        key.color_tag ? key.color_tag : "#dcfffd"
                      }
                    >
                      {key.tag_name}
                    </Tag>
                  </div>
                );
              })}
          </TagsContainer>
        </Column>
        <Column>
          <BrandSummary
            peopleImpact={brandData.people_score}
            planetImpact={brandData.planet_score}
            politicalImpact={brandData.political_impact}
            dashboard={dashboard}
          />
        </Column>
            </Container>
    </Wrapper>
  );
};
