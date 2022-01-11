import Image from "next/image";
import styled from "styled-components";
import { NavLink } from "@/theme/index";
import { Burger } from "@/components";
import { theme } from "@/theme/styles";
import Link from "next/link";
import Popup from "reactjs-popup";
import { BurgerMenu } from "@/components";
import { StyledImg } from "@/shared-components";
import { Searchbar } from "@/searchbar";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  background: ${(props) => (props.white ? theme.CLUEY_WHITE : theme.CLUEY_TAN)};
  display: flex;
  align-items: center;
  padding: 28px 0;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  justify-content: space-between;
  @media (max-width: 1080px) {
    width: 90%;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const DesktopMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    display: none;
  }
`;

const MobileMenuContainer = styled.div`
  display: none;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;

const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "100%",
  height: "100%",
  border: "none",
};

export const Navigation = ({ white }) => {
  const router = useRouter();
  const handleScrollNavigation = (scrollTo) => {
    router.push("/").then(() => {
      if (scrollTo === "how-it-works") {
        window.scroll({
          top: 750,
          behavior: "smooth",
        });
      } else if (scrollTo === "blog") {
        window.scroll({
          top: 2300,
          behavior: "smooth",
        });
      }
    });
  };
  return (
    <Wrapper white={white}>
      <Div>
        <DesktopMenuContainer>
          <Row style={{ width: "65%" }}>
            <div onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
              <StyledImg margin={"0 30px 0 0"} minWidth={"100px"}>
                <Image
                  src="/images/cluey-logo.png"
                  height={47}
                  width={140}
                  alt="Your Name"
                  layout="responsive"
                />
              </StyledImg>
            </div>

            <Searchbar />
          </Row>
          <Row>
            <NavLink
              marginRight
              mobileLink
              onClick={() => handleScrollNavigation("how-it-works")}
            >
              HOW IT WORKS
            </NavLink>
            <Link href="/about/faqs">
              <NavLink marginRight mobileLink>
                ABOUT US
              </NavLink>
            </Link>
            <NavLink
              marginRight
              mobileLink
              onClick={() => handleScrollNavigation("blog")}
            >
              BLOG
            </NavLink>
            <Link href="/login">
              <NavLink mobileLink>LOGIN</NavLink>
            </Link>
          </Row>
        </DesktopMenuContainer>
        <MobileMenuContainer>
          <Image
            src="/images/cluey-logo.png"
            height={47}
            width={140}
            alt="Your Name"
            layout="intrinsic"
          />
          <Row>
            <div
              style={{
                marginRight: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Popup
                modal
                overlayStyle={{ background: "rgba(255,255,255,0.98" }}
                contentStyle={contentStyle}
                closeOnDocumentClick={false}
                trigger={(open) => (
                  <Image
                    src="/images/cluey-search-icon-green.svg"
                    height={20}
                    width={20}
                    open={open}
                  />
                )}
              >
                {(close) => <BurgerMenu close={close} type={"search"} />}
              </Popup>
            </div>
            <Burger />
          </Row>
        </MobileMenuContainer>
      </Div>
    </Wrapper>
  );
};
