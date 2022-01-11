import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { theme } from "@/theme/styles";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  display: none;
  grid-area: mNav;
  width: 100%;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  background: #fafbfc;
  align-items: center;
  padding: 10px 0;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    display: flex;
  }
`;
const StyledImg = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  background-color: ${(props) =>
    props.linkActive && `${theme.CLUEY_NEON_GREEN}`};
`;

const navOptionsArr = [
  {
    name: "Dashboard",
    icon: "/images/cluey-option-home.svg",
    route: "/dashboard",
    slug: ["dashboard"],
  },
  {
    name: "Discover",
    icon: "/images/cluey-search-icon-green.svg",
    route: "/discover",
    slug: ["discover", "brands"],
  },
  {
    name: "My Reactions",
    icon: "/images/cluey-option-thumbs.svg",
    route: "/my-reactions/my-likes",
    slug: ["my-reactions"],
  },
  {
    name: "My Values",
    icon: "/images/cluey-option-cloud.svg",
    route: "/my-values",
    slug: ["my-values"],
  },
  {
    name: "About Cluey",
    icon: "/images/cluey-option-exclamation.svg",
    route: "/about/faqs",
    slug: ["about"],
  },
];

export const MobileNav = () => {
  const router = useRouter();
  return (
    <Wrapper>
      {navOptionsArr &&
        navOptionsArr.length > 0 &&
        navOptionsArr.map((key, index) => {
          const slug = key.slug.some((elem) => router.pathname.includes(elem));

          return (
            <LinkWrapper key={index} linkActive={slug}>
              <Link href={key.route} shallow>
                <StyledImg>
                  <Image
                    src={key.icon}
                    height={20}
                    width={20}
                    layout="responsive"
                  />
                </StyledImg>
              </Link>
            </LinkWrapper>
          );
        })}
    </Wrapper>
  );
};
