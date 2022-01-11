import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetUser } from "@/queries";
import { useSetRecoilState } from "recoil";
import { userDataAtom, currentTokenUserAtom } from "@/store";
import smartlookClient from "smartlook-client";
import jwt from "jsonwebtoken";

const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const setUser = useSetRecoilState(userDataAtom);
      const accessToken = localStorage.getItem("authorization");
      const setUserToken = useSetRecoilState(currentTokenUserAtom);

      if (router.pathname.includes("brands") && !accessToken) {
        return <WrappedComponent {...props} />;
      } else if (!accessToken) {
        router.replace("/login");
        return null;
      } else if (accessToken) {
        const userDecoded = jwt.verify(
          accessToken,
          process.env.NEXT_PUBLIC_JWT_KEY
        );
        const { data, isValidating } = useGetUser();
        const user_id = userDecoded.id;
        setUserToken(accessToken);
        useEffect(async () => {
          try {
            if (!isValidating) {
              setUser(data.user);
              if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
                smartlookClient.identify(user_id, {
                  name: `${data.user.first_name} ${data.user.last_name}`,
                  email: data.user.email,
                });
              }
            }
          } catch (err) {
            console.log(err);
          }
        }, [data, isValidating]);

        return <WrappedComponent {...props} />;
      }
    }

    return null;
  };
};

export default withAuth;
