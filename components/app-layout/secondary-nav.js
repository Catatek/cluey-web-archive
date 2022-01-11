import { theme } from "@/theme/styles";
import { OutlineNavBtn } from "@/shared-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { SettingTitle, Line } from "../settings/styles";

const Wrapper = styled.div`
  grid-area: secondary;
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  width: 100%;
  border-right: 1px solid ${theme.CLUEY_GRAY};
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 100%;
    border-right: none;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    flex-direction: row;
  }
`;

const NavLink = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 60px;
  padding-left: 30px;
  font-family: ${theme.CLUEY_INTER};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.69;
  letter-spacing: -0.16px;
  text-align: left;
  color: ${theme.CLUEY_DARK_GREEN};
  border-bottom: 1px solid ${theme.CLUEY_GRAY};
  border-right: 3px solid transparent;
  ${({ linkActive }) =>
    linkActive &&
    `
    border-right: 3px solid ${theme.CLUEY_DARK_GREEN};
  `}
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    border-bottom: none;
    justify-content: center;
    padding-left: 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    ${({ linkActive }) =>
      linkActive &&
      `
    border-bottom: 3px solid ${theme.CLUEY_DARK_GREEN};
    border-right: none;
  `}
  }
`;

const settingsLinksArr = [
  { title: "Account Settings", link: "/settings/manage-account" },
  { title: "Privacy & Security", link: "/settings/privacy-security" },
];

const myvaluesLinksArr = [
  { title: "Values & Demographics", link: "/my-values" },
];

export const SecondaryNav = ({ show }) => {
  const router = useRouter();
  const settingsRoute = router.pathname.includes("settings");
  const links = settingsRoute ? settingsLinksArr : myvaluesLinksArr;
  const title = settingsRoute ? "Manage Account" : "My Values";
  return (
    <Wrapper show={show}>
      <Row style={{ marginLeft: 20 }}>
        <OutlineNavBtn src={"/dashboard"}>
          <Image
            src="/images/cluey-chevron-left-green.svg"
            alt="Picture of the author"
            width={12}
            height={12}
            layout="intrinsic"
          />
        </OutlineNavBtn>
        <SettingTitle style={{ marginLeft: 20 }}>{title}</SettingTitle>
      </Row>
      <Line />
      <LinkWrapper>
        {links.length > 0 &&
          links.map((key, index) => (
            <Link key={index} href={key.link} shallow>
              <NavLink linkActive={router.pathname.includes(key.link)}>
                {key.title}
              </NavLink>
            </Link>
          ))}
      </LinkWrapper>
    </Wrapper>
  );
};
