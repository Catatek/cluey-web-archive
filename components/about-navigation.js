import styled from "styled-components";
import { theme } from "@/theme/styles";
import { Row, OutlineNavBtn } from "@/shared-components";
import { SubtitleBase, TitleBase } from "@/theme/index";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { currentTokenUserAtom } from "@/store";
import Image from "next/image";

const Div = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  height: 60px;
  border-bottom: 3px solid transparent;
  transition: 250ms;
  ${({ linkActive }) =>
    linkActive &&
    `
    border-bottom: 3px solid ${theme.CLUEY_DARK_GREEN};
  `}
`;

const TitleAbout = styled(SubtitleBase)`
  font-size: 18px;
  margin: 0px 0px 0px 15px;
  text-align: center;
`

const aboutMenuOptions = [
  {
    title: "FAQs",
    url: "/about/faqs",
  },
  {
    title: "Cluey Team",
    url: "/about/team",
  },
  // {
  //   title: "Upcoming Features",
  //   url: "/about/upcoming-features",
  // },
  {
    title: "Our Ratings & Data",
    url: "/about/our-ratings-and-data",
  },
];

export const AboutNavigation = () => {
  const router = useRouter();
  const token = useRecoilValue(currentTokenUserAtom);
  return (
    <>
      <Row align={"center"}>
        <OutlineNavBtn src={token == null ? "/" : "/dashboard"}>
          <Image
            src="/images/cluey-chevron-left-green.svg"
            alt="Picture of the author"
            width={12}
            height={12}
            layout="intrinsic"
          />
        </OutlineNavBtn>
        <TitleAbout>
          About Cluey
        </TitleAbout>
      </Row>
      <Row justify={"center"} align={"center"} margin={"20px 0"}>
        {aboutMenuOptions &&
          aboutMenuOptions.map((key, index) => (
            <Div
              key={index}
              linkActive={router.pathname.includes(key.url)}
              onClick={() => router.push(key.url)}
            >
              <TitleAbout>
                {key.title}
              </TitleAbout>
            </Div>
          ))}
      </Row>
    </>
  );
};
