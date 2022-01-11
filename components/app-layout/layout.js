import styled from "styled-components";
import "normalize.css";
import { TopNav, SideNav, Body, SideBody, Footer, MobileNav } from "./index";
import { useRouter } from "next/router";
import { theme } from "@/theme/styles";
import { SecondaryNav } from "./secondary-nav";
import {
  defaultLayout,
  defaultLayoutLgBreakpoint,
  defaultLayoutMobileBreakpoint,
  withoutSideBarLayout,
  withoutSideBarLayoutMobileBreakpoint,
} from "./grid-layout-constants";
import Head from "next/head";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  overflow-x: hidden;
  grid-template-columns: 185px 1fr 1fr 1fr 400px;
  grid-template-areas: ${defaultLayout};
  grid-template-rows: 85px 1fr 1fr 1fr 85px;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE_LG}) {
    grid-template-areas: ${defaultLayoutLgBreakpoint};
    grid-template-columns: 185px 1fr 1fr 1fr 1fr;
  }
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    grid-template-columns: repeat(5, 1fr)!important;
    grid-template-areas: ${defaultLayoutMobileBreakpoint};
  }
  @media (max-width: ${theme.CLUEY_SIZE_BREAK_POINT}) {
    grid-template-columns: 185px 1fr 1fr 1fr 315px;
  }
  ${({ hideSidebar }) =>
    hideSidebar &&
    `
      grid-template-columns: 200px 280px 1fr 1fr 1fr;
      grid-template-areas: ${withoutSideBarLayout};   
        @media (max-width: ${theme.CLUEY_SIZE_MOBILE_LG}) {
          grid-template-areas: ${withoutSideBarLayout};
        }
        @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
          grid-template-rows: 85px 100px 1fr 1fr 85px;
          grid-template-columns: repeat(5, 1fr);
          grid-template-areas: ${withoutSideBarLayoutMobileBreakpoint};
      }
  `}
`;

export const AppLayout = ({ children, meta }) => {
  const router = useRouter();
  const hideSidebar =
    router.pathname.includes("settings") ||
    router.pathname.includes("my-values");
  return (
    <Wrapper hideSidebar={hideSidebar}>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <TopNav />
      <SideNav />
      <SecondaryNav show={hideSidebar} />
      <Body>{children}</Body>
      <SideBody show={!hideSidebar} />
      <MobileNav />
      <Footer />
    </Wrapper>
  );
};
