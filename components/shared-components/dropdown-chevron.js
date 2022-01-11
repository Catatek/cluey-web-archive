import styled from "styled-components";
import Image from "next/image";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 250ms;
  transform: ${({ chevronOpen }) => chevronOpen && "rotate(0deg)"};
`;

export const DropdownChevron = ({
  chevronOpen,
  handler,
  large = false,
  small = false,
  white = false,
}) => {
  const imageSize = large ? 15 : small ? 8 : 12;
  const color = white ? "white" : "grey";
  return (
    <Wrapper
      chevronOpen={chevronOpen}
      style={{ marginLeft: 10 }}
      onClick={handler}
    >
      <Image
        src={`/images/cluey-chevron-down-${color}.svg`}
        height={imageSize}
        width={imageSize}
      />
    </Wrapper>
  );
};
