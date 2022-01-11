import Link from "next/link";
import styled from "styled-components";
import { theme } from "@/theme/styles";

const CustomLink = styled.a`
  cursor: pointer;
  font-family: ${theme.CLUEY_INTER};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  font-weight: ${(props) => props.weight};
  letter-spacing: ${(props) => props.letterSpacing};
  text-align: ${(props) => props.textAlign};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  margin: ${(props) => props.margin};
  text-decoration: ${(props) => props.decoration};
`;

export const NavLink = ({ ...props }) => {
  const {
    src,
    text,
    fontSize,
    weight,
    letterSpacing,
    textAlign,
    color,
    lineHeight,
    margin,
    decoration,
  } = props;
  return (
    <Link href={src}>
      <CustomLink
        fontSize={fontSize}
        weight={weight}
        letterSpacing={letterSpacing}
        textAlign={textAlign}
        color={color}
        lineHeight={lineHeight}
        decoration={decoration}
        margin={margin}
      >
        {text}
      </CustomLink>
    </Link>
  );
};
