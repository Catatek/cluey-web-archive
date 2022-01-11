import styled from "styled-components";
import Image from "next/image";
import {
  Row,
  OutlineNavBtn,
  NavLink,
  DropdownChevron,
} from "@/shared-components";
import { theme } from "@/theme/styles";
import { DropDown, DropDownContent } from "components/dashboard/styles";
import { useEffect, useState, useRef } from "react";
import { useSubCategoryById, useSubCategories } from "@/queries";
import { BrandCard } from "components/brand-card";
import { useRouter } from "next/router";
import withAuth from "HOC/withAuth";
import InfiniteScroll from "react-infinite-scroll-component";
import { SubtitleBase, TitleBase } from "@/theme/index";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px 0;
  width: 95%;
  height: auto;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const Title = styled(TitleBase)`
  letter-spacing: -0.28px;
  font-size: 24px;
  margin:40px 0px;
`

const Subtitle = styled(SubtitleBase)`
  font-size: 18px;
  font-weight: ${theme.CLUEY_NORMAL};
  color: ${theme.CLUEY_VERY_DARK_GREY};
  line-height: 1.29;
`
const TextBase = styled.p`
  font-family: ${theme.CLUEY_INTER};
  font-weight: ${theme.CLUEY_LIGHT};
  color: ${theme.CLUEY_DARK_GREY};
`

const TextItem = styled(TextBase)`
  margin:0 0 8px 0;
  font-size: 11px;
  letter-spacing: -0.13px;
  color: ${(props) => (props.recolor ? `${theme.CLUEY_LINK_GREEN}` : " ")};
`

const TextFilter = styled(TextBase)`
  margin: 0 0 0 15px;
  font-size: 12px;
`

const FilterItem = ({
  name,
  setFilterByName,
  setFilterDropdownActive,
  filterByName,
}) => (
  <span
    style={{
      justifyContent: "space-between",
      display: "flex",
      cursor: "pointer",
    }}
    onClick={() => {
      setFilterByName(name);
      setFilterDropdownActive(false);
    }}
  >
    <TextItem
      recolor={filterByName === name}
    >
      {name}
    </TextItem>
    {filterByName === name && (
      <Image src="/images/cluey-check-green.svg" width={8} height={8} />
    )}
  </span>
);

const CategoriesPage = ({ subCategory }) => {
  const { isFallback } = useRouter();
  if (!subCategory) return <div>404</div>;
  if (isFallback) return <div>Loading</div>;

  const [activeDropdowns, setActiveDropdowns] = useState([]);
  const [filterdropdownActive, setFilterDropdownActive] = useState(false);
  const [filterByName, setFilterByName] = useState("All Subcategories");
  const [activeFilter, setActiveFilter] = useState({});

  const topRef = useRef();

  const handleDropdown = (id) => {
    if (activeDropdowns.includes(id)) {
      let activesArr = [...activeDropdowns];
      const i = activesArr.indexOf(id);
      if (i !== -1) {
        activesArr.splice(i, 1);
      }
      setActiveDropdowns(activesArr);
    } else {
      setActiveDropdowns([...activeDropdowns, id]);
    }
  };

  useEffect(() => {
    if (filterByName !== "All Subcategories") {
      const subSubCategoryObj = subCategory.subSubCategory.find(
        (elem) => elem.name === filterByName
      );
      setActiveFilter(subSubCategoryObj);
    } else {
      setActiveFilter({});
    }
  }, [filterByName]);

  useEffect(() => {
    topRef.current.scrollIntoView();
  }, []);

  return (
    <Wrapper>
      <Container ref={topRef}>
        <Row justify={"space-between"}>
          <Row align={"center"} justify={"center"}>
            <OutlineNavBtn src="/discover">
              <Image
                src="/images/cluey-chevron-left-green.svg"
                alt="Picture of the author"
                width={12}
                height={12}
                layout="intrinsic"
              />
            </OutlineNavBtn>
            <NavLink
              src={"/discover"}
              text={"Discover >"}
              margin={"0 0 0 15px"}
              fontSize={"12px"}
              weight={`${theme.CLUEY_LIGHT}`}
              color={`${theme.CLUEY_DARK_GREY}`}
            />
            <NavLink
              src={`/category/${subCategory?.id}`}
              text={subCategory?.name}
              margin={"0 0 0 5px"}
              fontSize={"12px"}
              weight={`${theme.CLUEY_LIGHT}`}
              color={`${theme.CLUEY_DARK_GREY}`}
            />
          </Row>
          <Row align={"center"} justify={"center"}>
            <DropDown>
              <Row align={"center"}>
                <TextFilter>
                  Filter By : {filterByName}
                </TextFilter>
                <DropdownChevron
                  chevronOpen={filterdropdownActive}
                  handler={() =>
                    setFilterDropdownActive((prevState) => !prevState)
                  }
                />
              </Row>
              <DropDownContent
                right
                show={filterdropdownActive}
                style={{ margin: 0 }}
              >
                <FilterItem
                  name={"All Subcategories"}
                  setFilterByName={setFilterByName}
                  setFilterDropdownActive={setFilterDropdownActive}
                  filterByName={filterByName}
                />
                {subCategory.subSubCategory &&
                  subCategory.subSubCategory.length > 0 &&
                  subCategory.subSubCategory.map((key) => (
                    <FilterItem
                      index={key.id}
                      name={key.name}
                      setFilterByName={setFilterByName}
                      setFilterDropdownActive={setFilterDropdownActive}
                      filterByName={filterByName}
                    />
                  ))}
              </DropDownContent>
            </DropDown>
          </Row>
        </Row>
        <Title>
          {subCategory.name}
        </Title>

        <InfiniteScroll
          dataLength={
            subCategory &&
            subCategory.subSubCategory &&
            subCategory.subSubCategory.length > 0 &&
            subCategory.subSubCategory.length
          }
        >
          {activeFilter && activeFilter.id && (
            <DropDown style={{ marginBottom: 30 }}>
              <Row align={"center"}>
                <Subtitle>
                  {activeFilter.name}
                </Subtitle>

                <DropdownChevron
                  style={{ marginLeft: 10 }}
                  handler={() => handleDropdown(activeFilter.id)}
                  chevronOpen={true}
                />
              </Row>

              <DropDownContent show={true}>
                <InfiniteScroll dataLength={activeFilter.brands.length}>
                  {activeFilter?.brands.map((brand, index) => {
                    return (
                      <BrandCard
                        key={index}
                        brandData={brand}
                        showReactionsInfo
                        showReactionsActions
                      />
                    );
                  })}
                </InfiniteScroll>
              </DropDownContent>
            </DropDown>
          )}
          {!activeFilter.id &&
            subCategory &&
            subCategory.subSubCategory &&
            subCategory.subSubCategory.length > 0 &&
            subCategory.subSubCategory.map((key) => {
              if (key.brands && key.brands.length > 0) {
                return (
                  <>
                    <DropDown key={key.id} style={{ marginBottom: 30 }}>
                      <Row align={"center"}>
                        <Subtitle>
                          {key.name}
                        </Subtitle>

                        <DropdownChevron
                          style={{ marginLeft: 10 }}
                          handler={() => handleDropdown(key.id)}
                          chevronOpen={activeDropdowns.includes(key.id)}
                        />
                      </Row>
                      {activeDropdowns.includes(key.id) && (
                        <DropDownContent
                          show={activeDropdowns.includes(key.id)}
                        >
                          <InfiniteScroll dataLength={key.brands.length}>
                            {key.brands.map((brand, index) => {
                              return (
                                <BrandCard
                                  key={index}
                                  brandData={brand}
                                  showReactionsInfo
                                  showReactionsActions
                                />
                              );
                            })}
                          </InfiniteScroll>
                        </DropDownContent>
                      )}
                    </DropDown>
                  </>
                );
              }
            })}
        </InfiniteScroll>
      </Container>
    </Wrapper>
  );
};

export const getStaticPaths = async () => {
  const subCategories = await useSubCategories();

  const paths = subCategories.map(({ id }) => ({
    params: { slug: id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  try {
    const subCategory = await useSubCategoryById(params.slug);

    return {
      props: {
        subCategory,
        meta: {
          title: `${subCategory?.name} | Cluey Consumer`,
        },
      },
      revalidate: 60,
    };
  } catch (err) {
    console.log(err);
    return { notFound: true };
  }
};

export default withAuth(CategoriesPage);
