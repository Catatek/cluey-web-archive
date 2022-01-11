import { TextBase } from "@/theme/index";
import { theme } from "@/theme/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const AlertWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0;
  height: 20px;
  padding: 8.7px 21.1px 8.7px 12.4px;
  border-radius: 7px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
  border: solid 3.7px #36ca5c;
  background-color: #e7fff0;
  left: 0;
  margin: ${(props) => (props.margin ? props.margin : "0 0 0 40px")};
  -webkit-animation: fadeinout 0.5s linear forwards;
  animation: fadeinout 2.5s linear forwards;
  opacity: 0;
  ${({ bgError }) =>
    bgError &&
    `
    justify-content: flex-start;
    border: solid 3.7px #CF4D42;
    background-color: #fae7e4;
  `}
  ${({ bgWarning }) =>
    bgWarning &&
    `
    opacity: 1;
    justify-content: flex-start;
    border: solid 3.7px #ffd767;
    background-color: #fffdf4;

  `}
@-webkit-keyframes fadeinout {
    50% {
      opacity: 1;
    }
  }

  @keyframes fadeinout {
    50% {
      opacity: 1;
    }
  }

  @media (max-width: ${theme.CLUEY_SIZE_MOBILE_LG}) {
    display: none;
  }
`;

const Text = styled(TextBase)`
  margin: 0px 10px;
  color: ${theme.CLUEY_MEDIUM_GREY};
  font-weight: 500;
  font-size: 12;
`

export const ShowMessage = ({ type, message, action, margin }) => {
  const [closeAlert, setCloseAlert] = useState(false);
  const router = useRouter();
  const handleAlert = () => {
    setCloseAlert(true);
  };
  return (
    <>
      {!closeAlert && (
        <AlertWrapper
          onClick={action}
          margin={margin}
          bgError={type === "error"}
          bgWarning={type === "warning"}
        >
          {router.pathname === "/dashboard" && (
            <Image src="/images/signup-hand.png" width={24} height={24} />
          )}
          <Text>
            {message}
          </Text>
          <Image
            src="/images/cluey-times-dark.svg"
            width={15}
            height={15}
            onClick={handleAlert}
          />
        </AlertWrapper>
      )}
    </>
  );
};
