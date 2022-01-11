import Head from "next/head";
import styled from "styled-components";
import "normalize.css";
import { Navigation } from "./navigation";
import { Footer } from "./footer";
import { GA_TRACKING_ID } from "../../utils/gtag";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Layout = ({ children, navigation = true, white }) => {
  console.log(GA_TRACKING_ID);
  return (
    <Wrapper>
      <Head>
        <title>
          Cluey Consumer | Look under the hood of your favorite brands
        </title>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
          }}
        />
      </Head>
      {navigation && <Navigation white={white} />}
      {children}
      <Footer />
    </Wrapper>
  );
};
