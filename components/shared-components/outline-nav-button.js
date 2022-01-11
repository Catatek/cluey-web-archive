import { theme } from "@/theme/styles";
import { useRouter } from "next/router";
import styled from "styled-components";

const Div = styled.button`
  width: 32px;
  height: 32px;
  flex-grow: 0;
  border-radius: 50%;
  border: 2px solid ${theme.CLUEY_DARK_GREEN};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;
  :disabled {
    opacity: 0.3;
  }
  cursor: pointer;
  cursor: hand;
`;

export const OutlineNavBtn = ({ children, src }) => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push(src);
  };

  return <Div onClick={handleNavigate}>{children}</Div>;
};
