import styled from "styled-components";
import Link from "next/link";
import moment from "moment";
import { TextBase } from "@/theme/index";
import { Column } from "./shared-components";
import { theme } from "@/theme/styles";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  box-sizing: border-box;
  transition: 250ms;
  height: 105px;
  ${({ sideBody }) =>
    sideBody &&
    `
  border-top: 1px solid ${theme.CLUEY_GRAY};
  padding: 10px 20px;
  &:hover {
    background-color: ${theme.CLUEY_GRAY_HOVER};
  }
  `}
`;

const ListText = styled(TextBase)`
  font-size: 14px;
  font-weight: ${theme.CLUEY_SEMI_BOLD};
  line-height: 1.29;
  letter-spacing: -0.14px;
  color: ${theme.CLUEY_DARK};
  text-align: left;
  margin: 0;
`;

const ListDate = styled(ListText)`
  color: ${theme.CLUEY_DARK_GREY};
  margin-top: 8px;
`;

const ATag = styled.a`
  text-decoration: none;
  color: inherit;
`;

const LinkComponent = ({ href, external, children }) => {
  if (external) {
    return (
      <ATag href={href} target="_blank">
        {children}
      </ATag>
    );
  } else {
    return <Link href={`/blog/${href}`}>{children}</Link>;
  }
};

export const NewsItem = ({
  title,
  date,
  src,
  href,
  external = false,
  sideBody = false,
}) => {
  const displayTitle = title.length >= 50 ? `${title.slice(0, 50)}...` : title;
  return (
    <LinkComponent href={href} external={external}>
      <Wrapper sideBody={sideBody}>
        <Column align="flex-start">
          <ListText>{displayTitle}</ListText>
          <ListDate>{moment(date).startOf("day").fromNow()}</ListDate>
        </Column>

        {src && (
          <img
            src={src}
            style={{
              width: 65,
              height: 65,
              borderRadius: 12,
              objectFit: "cover",
              marginLeft: 15,
            }}
          />
        )}
      </Wrapper>
    </LinkComponent>
  );
};
