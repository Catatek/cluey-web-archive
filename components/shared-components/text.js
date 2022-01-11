import styled from "styled-components";
import { theme } from "@/theme/styles";

const CustomText = styled.p`
  font-family: ${theme.CLUEY_INTER};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  font-weight: ${(props) => props.weight};
  letter-spacing: ${(props) => props.letterSpacing};
  text-align: ${(props) => props.textAlign};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  margin: ${(props) => props.margin};
  color: ${(props) => (props.recolor ? `${theme.CLUEY_LINK_GREEN}` : " ")};

  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    font-size: ${(props) => props.MFontSize};
    font-weight: ${(props) => props.MWeight};
    height: ${(props) => props.MHeight};
    border-bottom: ${(props) => props.MBorder};
    width: ${(props) => props.MWidth};
    cursor: ${(props) => props.MCursor};
  }
  @media (max-width: 543px) {
    width: ${(props) => props.MWidth};
  }
`;

export const Text = ({ children, ...props }) => {
  const {
    fontSize,
    weight,
    letterSpacing,
    textAlign,
    color,
    lineHeight,
    margin,
    recolor,
    MWidth,
    MFontSize,
    MWeight,
    MBorder,
    MHeight,
    MCursor,
  } = props;
  return (
    <CustomText
      fontSize={fontSize}
      weight={weight}
      letterSpacing={letterSpacing}
      textAlign={textAlign}
      color={color}
      lineHeight={lineHeight}
      margin={margin}
      recolor={recolor}
      MWidth={MWidth}
      MFontSize={MFontSize}
      MWeight={MWeight}
      MBorder={MBorder}
      MHeight={MHeight}
      MCursor={MCursor}
    >
      {children}
    </CustomText>
  );
};
