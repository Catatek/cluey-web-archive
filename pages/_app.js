import { useEffect } from "react";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import { AppLayout } from "@/app-layout";
import { useRouter } from "next/router";
import { IntercomProvider } from "react-use-intercom";
import smartlookClient from "smartlook-client";
import "./styles.css";

// const DebugObserver = () => {
//   const snapshot = useRecoilSnapshot();
//   useEffect(() => {
//     console.debug("The following atoms were modified:");
//     for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
//       console.debug(node.key, snapshot.getLoadable(node));
//     }
//   }, [snapshot]);

//   return null;
// };

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const routerPath = router.pathname;
  const {
    meta = {
      title: "Cluey Consumer | Look under the hood of your favorite brands",
    },
  } = pageProps;
  const layoutPaths = [
    "settings",
    "dashboard",
    "brands",
    "discover",
    "my-values",
    "my-reactions",
    "faqs",
    "team",
    "our-ratings-and-data",
    "upcoming-features",
    "category",
  ];
  const showLayout = layoutPaths.some((path) => routerPath.includes(path));
  const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
      smartlookClient.init(process.env.NEXT_PUBLIC_SMARTLOOK_ACCESS_TOKEN);
    }
  }, []);

  return (
    <RecoilRoot>
      {/* <DebugObserver /> */}
      <IntercomProvider appId={INTERCOM_APP_ID} autoBoot>
        {showLayout && (
          <AppLayout meta={meta}>
            <Component {...pageProps} />
          </AppLayout>
        )}
        {!showLayout && <Component {...pageProps} />}
      </IntercomProvider>
    </RecoilRoot>
  );
};

export default MyApp;
