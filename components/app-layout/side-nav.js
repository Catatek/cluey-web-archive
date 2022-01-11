import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { theme } from "@/theme/styles";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { currentTokenUserAtom } from "@/store";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  grid-area: nav;
  border-right: 1px solid ${theme.CLUEY_GRAY};
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 20px auto;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  border-radius: 20px;
  background-color: ${(props) => props.linkActive};
`;

const NavLink = styled.a`
  cursor: pointer;
  font-family: ${theme.CLUEY_INTER};
  font-size: 16px;
  font-weight: ${theme.CLUEY_BOLD};
  line-height: 2.63;
  letter-spacing: -0.16px;
  color: ${theme.CLUEY_DARK_GREEN};
`;

const StyledImg = styled.div`
  width: 20px;
  height: 20px;
`;

const privateNavOptions = [
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
const publicNavOptions = [
  {
    name: "Discover",
    icon: "/images/cluey-search-icon-green.svg",
    route: "/",
    slug: ["discover", "brands"],
  },
  {
    name: "About Cluey",
    icon: "/images/cluey-option-exclamation.svg",
    route: "/about/faqs",
    slug: ["about"],
  },
];

export const SideNav = () => {
  const router = useRouter();
  const token = useRecoilValue(currentTokenUserAtom);

  let navOptionsArr = [];

  !token
    ? (navOptionsArr = [...publicNavOptions])
    : (navOptionsArr = [...privateNavOptions]);
  return (
    <Wrapper>
      <Container>
        {navOptionsArr &&
          navOptionsArr.length > 0 &&
          navOptionsArr.map((key, index) => {
            const slug = key.slug.some((elem) =>
              router.pathname.includes(elem)
            );
            return (
              <Row key={index} linkActive={slug && `${theme.CLUEY_NEON_GREEN}`}>
                <StyledImg style={{ margin: "0 10px" }}>
                  <Image
                    src={key.icon}
                    height={20}
                    width={20}
                    layout="responsive"
                  />
                </StyledImg>
                <Link href={key.route} shallow>
                  <NavLink>{key.name}</NavLink>
                </Link>
              </Row>
            );
          })}
      </Container>
    </Wrapper>
  );
};
