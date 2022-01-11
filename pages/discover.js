import { Row, OutlineNavBtn, StyledImg } from "@/shared-components";
import { theme } from "@/theme/styles";
import { BrandCard, CategoryCard } from "@/components";
import withAuth from "HOC/withAuth";
import Image from "next/image";
import styled from "styled-components";
import { useGetTopReactedToBrands } from "@/queries";
import { Searchbar } from "@/searchbar";
import { sub_categories } from "constants/sub_categories-data";
import { SubtitleBase } from "../theme/index";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px 0;
  width: 95%;
  height: auto;
  box-sizing: border-box;
`;

const Title = styled(SubtitleBase)`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.18px;
  text-align: left;
  color: ${theme.CLUEY_DARK_GREEN};
`;

const SubTitle = styled.h3`
  font-family: ${theme.CLUEY_INTER};
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.18px;
  text-align: left;
  color: ${theme.CLUEY_DARK_GREEN};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: auto;
  margin: 20px auto;
  grid-gap: 50px;
  width: 100%;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 90%;
  }
`;

const Discover = () => {
  let date = new Date();
  date.setMonth(date.getMonth() - 1);
  date = new Date(date).toISOString().slice(0, 10);
  const { data, isValidating } = useGetTopReactedToBrands({
    filter: { type: "date", comparator: ">=", field: date },
  });
  const topReactedBrands = !isValidating && data?.topReactedToBrands;

  return (
    <>
      <Container>
        <Row align={"center"}>
          <OutlineNavBtn src={"/dashboard"}>
            <Image
              src="/images/cluey-chevron-left-green.svg"
              alt="Picture of the author"
              width={12}
              height={12}
              layout="intrinsic"
            />
          </OutlineNavBtn>
          <Title style={{ marginLeft: 15 }}>Discover</Title>
        </Row>
        <Searchbar margin />
        <Row align={"center"}>
          <StyledImg height={"25px"} width={"25px"}>
            <Image
              src="/images/cluey-home.png"
              alt="Picture of the author"
              width={50}
              height={50}
              layout="responsive"
            />
          </StyledImg>
          <SubTitle style={{ marginLeft: 10 }}>Browse by Category</SubTitle>
        </Row>

        <Grid>
          {sub_categories.map((key, index) => {
            return (
              <CategoryCard
                key={index}
                id={key.type_id}
                img={key.image || ""}
                title={key.name}
                index={index}
              />
            );
          })}
        </Grid>
      </Container>
      <Container>
        <Row align={"center"}>
          <StyledImg height={"25px"} width={"25px"}>
            <Image
              src="/images/cluey-megaphone-icon.png"
              alt="Picture of the author"
              width={50}
              height={50}
              layout="responsive"
            />
          </StyledImg>
          <SubTitle style={{ marginLeft: 10 }}>
            Other Users are Reacting
          </SubTitle>
        </Row>
      </Container>

      {topReactedBrands &&
        topReactedBrands.length > 0 &&
        topReactedBrands.map((key, index) => (
          <BrandCard
            index={index}
            key={key.id}
            squareCard
            brandData={key}
            showReactionsInfo
            showReactionsActions
            dashboard={true}
          />
        ))}
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      meta: {
        title:
          "Discover | Cluey Consumer | Look under the hood of your favorite brands",
      },
    },
  };
}

export default withAuth(Discover);
