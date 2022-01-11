import { theme } from "@/theme/styles";
import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  margin-top: 30px;
  width: 100%;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:nth-child(even){
    flex-grow: 1;
  }
  &:last-child{
    display: none;
  }
`;

const Step = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  cursor: pointer;
  border: solid 1px ${theme.CLUEY_DARK_GREY};
  background-color: ${theme.CLUEY_TAN};
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ btnActive }) =>
    btnActive &&
    `
    border: solid 1px ${theme.CLUEY_DARK_GREEN};
  `}
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 38px;
    height: 38px;
    padding: 0px;
  }
`;

const StepBg = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${theme.CLUEY_DARK_GREEN};
  position: relative;
  border: none;
`;

const StepText = styled.p`
  font-family: ${theme.CLUEY_INTER};
  font-size: 14px;
  line-height: 2;
  letter-spacing: -0.14px;
  text-align: center;
  color: ${theme.CLUEY_DARK_GREY};
  ${({ btnActive }) =>
    btnActive &&
    `
    color:${theme.CLUEY_DARK_GREEN};
  `}
  @media(max-width: 450px){
    font-size: 12px;
  }
`;

const Line = styled.div`
  border-top: 1px solid ${theme.CLUEY_DARK_GREY};
  height: 1px;
  margin-top: 20px;
  width: 100%;
`

const importantArr = ["Unimportant", "Somewhat Important", "Very Important"];
const politicalAffArr = ["Left-Leaning", "Center", "Right-Leaning"];

export const ImportanceInput = ({ values, setFieldValue, type }) => {
  const mappableArr =
    type === "political_affiliation" ? politicalAffArr : importantArr;

  const handleBtn = (index) => {
    if (values[type] === index) {
      setFieldValue([type], 3);
    } else {
      setFieldValue([type], index);
    }
  };

  return (
    <Row>
      {mappableArr.map((key, index) => {
        const btnActive = values[type] === index;
        return (
          <>
            <Column>
              <Step
                type="button"
                onClick={() => handleBtn(index)}
                btnActive={btnActive}
              >
                {btnActive && <StepBg />}
              </Step>
              <StepText btnActive={btnActive}>{key}</StepText>
            </Column>
            <Column>
              <Line />
            </Column>
          </>
        );
      })}
    </Row>
  );
};
