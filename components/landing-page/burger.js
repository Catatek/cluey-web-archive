import Popup from "reactjs-popup";
import Link from "next/link";
import styled, { css } from "styled-components";
import { theme } from "@/theme/styles";
import Image from "next/image";
import { Searchbar } from "@/searchbar";
import { useRouter } from "next/router";
import { StyledImg } from "@/shared-components";

const BurgerWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  position: relative;
  z-index: 99999;

  .bar1,
  .bar2,
  .bar3 {
    width: 25px;
    min-height: 3px;
    max-height: 3px;
    background-color: ${theme.CLUEY_DARK_GREEN};
    border-radius: 4px;
    margin: 0.25em 0;
    transition: 0.4s;
  }
  ${(props) =>
    props.open &&
    css`
      .bar1 {
        -webkit-transform: rotate(-45deg) translate(-4px, 4px);
        transform: rotate(-45deg) translate(-4px, 4px);
        background-color: ${theme.CLUEY_WHITE};
      }
      .bar2 {
        opacity: 0;
        background-color: ${theme.CLUEY_WHITE};
      }
      .bar3 {
        -webkit-transform: rotate(45deg) translate(-6px, -6px);
        transform: rotate(45deg) translate(-6px, -6px);
        background-color: ${theme.CLUEY_WHITE};
      }
    `}
`;

function BurgerIcon({ open, ...props }) {
  return (
    <BurgerWrapper open={open} {...props}>
      <div className="bar1" key="b1" />
      <div className="bar2" key="b2" />
      <div className="bar3" key="b3" />
    </BurgerWrapper>
  );
}

const MenuWrapper = styled.div`
  background-color: ${theme.CLUEY_DARK_GREEN};
  overflow-y: hidden;
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  height: 60px;
`;

const Div = styled.div`
  height: 1px;
  margin: 26.6px 0 31px;
  opacity: 0.5;
  background-color: #499b8d;
`;

const Column = styled.div`
  margin: 26.6px 0 31px;
  display: flex;
  flex-direction: column;
  margin: 43px 0em 1.5em 2em;
`;
const NavLink = styled.a`
  font-family: ${theme.CLUEY_INTER};
  font-size: 20px;
  font-weight: ${theme.CLUEY_BOLD};
  margin: ${(props) => props.margin || "5px 0"};
  line-height: 1.45;
  letter-spacing: 1px;
  margin-bottom: 30px;
  cursor: pointer;
  color: ${(props) =>
    props.white ? theme.CLUEY_WHITE : theme.CLUEY_DARK_GREEN};
`;

export function BurgerMenu({ close }) {
  const router = useRouter();
  const handleScrollNavigation = (scrollTo) => {
    router.push("/").then(() => {
      close();
      if (scrollTo === "how-it-works") {
        window.scroll({
          top: 1000,
          behavior: "smooth",
        });
      } else if (scrollTo === "blog") {
        window.scroll({
          top: 3650,
          behavior: "smooth",
        });
      }
    });
  };
  return (
    <MenuWrapper>
      <Container>
        <StyledImg margin="40px 0 0 0">
          <Image
            src="/images/cluey-logo-white.png"
            height={36}
            width={106}
            alt="Cluey Logo"
          />
        </StyledImg>
      </Container>
      <Div />
      <Container>
        <Searchbar />
      </Container>
      <Column>
        <NavLink white onClick={() => handleScrollNavigation("how-it-works")}>
          How It Works
        </NavLink>

        <Link href="/about/faqs">
          <NavLink white>About Us</NavLink>
        </Link>

        <NavLink white onClick={() => handleScrollNavigation("blog")}>
          Blog
        </NavLink>

        <Link href="/login">
          <NavLink white>Account Login</NavLink>
        </Link>
      </Column>
    </MenuWrapper>
  );
}

const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "100%",
  height: "100%",
  border: "none",
};

export const Burger = () => {
  return (
    <Popup
      modal
      overlayStyle={{ background: "rgba(255,255,255,0.98" }}
      contentStyle={contentStyle}
      closeOnDocumentClick={false}
      trigger={(open) => <BurgerIcon open={open} />}
    >
      {(close) => <BurgerMenu close={close} />}
    </Popup>
  );
};
