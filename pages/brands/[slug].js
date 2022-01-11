import styled from "styled-components";
import { useGetBrands, useGetBrand } from "@/queries";
import withAuth from "HOC/withAuth";
import {
  Alternatives,
  BrandNews,
  BrandProfile,
} from "components/brands-profile";
import { Line } from "@/settings/styles";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { WrapperBase as Wrapper } from "@/theme/index";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px 0;
  width: 95%;
  height: auto;
  box-sizing: border-box;
`;

const BrandsPage = ({ brand }) => {
  const [showModal, setShowModal] = useState(false);
  const { isFallback } = useRouter();
  if (!brand) return <div>404</div>;
  if (isFallback) return <div>Loading</div>;

  const topRef = useRef();
  const wrapperRef = useRef();

  const handleScroll = () => {
    if (wrapperRef.current.parentNode) {
      const { scrollTop, scrollHeight, clientHeight } = wrapperRef.current.parentNode;
      if (scrollTop + clientHeight === scrollHeight) {
        setShowModal(true);
      }
    }
  };

  const token = typeof window !== "undefined" && localStorage.getItem("authorization");
  useEffect(() => {
    if (!token) {
      wrapperRef.current.parentNode.addEventListener('scroll', handleScroll);
    }
  }, [token]);

  useEffect(() => {
    topRef.current.scrollIntoView();
  }, [brand]);

  return (
    <Wrapper ref={wrapperRef}>
      <Container ref={topRef}>
        <BrandProfile staticBrandProps={brand} showModal={showModal}/>
        <Alternatives alternatives={brand.alternatives} />
        <Line />
        <BrandNews brandName={brand.name} news={brand.news} />
      </Container>
    </Wrapper>
  );
};

export const getStaticPaths = async () => {
  const { brands } = await useGetBrands();
  const paths = brands.map(({ slug }) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  try {
    const { brand } = await useGetBrand(`{slug: "${params.slug}"}`);
    const { parentCompany, political_impact } = brand;

    let parentCompanyArr = [];
    parentCompany &&
      parentCompany.map((company) => {
        parentCompanyArr.push(` ${company.name}`);
      });
    
    const politicalImpactValue = political_impact ? Math.round((100 * political_impact.republican_total) / political_impact.total) : 0;

    return {
      props: {
        brand,
        meta: {
          title: `How Ethical is ${brand?.name}? Discover Impacts with Cluey | Cluey Consumer`,
          description: `${brand?.name}, owned by ${parentCompanyArr}, donates ${politicalImpactValue}% of its political contributions to the US Republican Party. Discover impacts on People and the Planet with Cluey!`
        },
      },
      revalidate: 60,
    };
  } catch (err) {
    return { notFound: true };
  }
};

export default withAuth(BrandsPage);
