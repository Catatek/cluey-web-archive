import Image from "next/image";
import styled from "styled-components";
import { theme } from "@/theme/styles";
import { BrandCard, ToggleBrands } from "@/components";
import { useEffect, useState } from "react";
import { useTopReactedToBrands } from "@/queries";

const Wrapper = styled.div`
  width: 100%;
  padding: 48px 0;
  height: auto;
  background-color: ${theme.CLUEY_ORANGE_RED};
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  text-align: center;
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 90%;
  }
`;

const Subtitle = styled.h2`
  font-family: ${theme.CLUEY_TEST_FINANCIER_DISPLAY};
  font-size: 42px;
  font-weight: ${theme.CLUEY_BOLD};
  margin: 0px;
  color: ${theme.CLUEY_WHITE};
  @media (max-width: ${theme.CLUEY_SIZE_MOBILE}) {
    width: 90%;
    font-size: 32px;
  }
`;

const Text = styled.p`
  font-family: ${theme.CLUEY_INTER};
  font-size: 16px;
  margin: ${(props) => props.margin || "6px 0"};
  line-height: 1.45;
  color: ${theme.CLUEY_WHITE};
  text-align: center;
  font-weight: ${theme.CLUEY_LIGHT};
  margin: 25px 0;
  width: 90%;
`;

const TextBold = styled.span`
  font-weight: 600;
`;

export const TopReactedToBrands = () => {
  const [topReactedBrands, setTopReactedBrands] = useState([]);
  useEffect(async () => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    date = new Date(date).toISOString().slice(0, 10);
    const res = await useTopReactedToBrands({
      filter: { type: "date", comparator: ">=", field: date },
    });
    setTopReactedBrands(res);
  }, []);
  return (
    <Wrapper>
      <Container>
        <Subtitle>
          <Image
            src="/images/cluey-megaphone-icon.png"
            height={30}
            width={30}
            alt="Your Name"
          />
          &nbsp;Our Users are Sending a Message
        </Subtitle>

        <Text
          white
          center
          style={{
            fontWeight: `${theme.CLUEY_LIGHT}`,
            margin: 25,
          }}
        >
          Check out the latest brands getting the most&nbsp;
          <TextBold>positive</TextBold> and <TextBold>negative&nbsp;</TextBold>
          attention from our users. We help you discover brands’ impacts across
          people, planet, and politics, and you anonymously share how you feel.
          Together, we will influence change in a major way.
        </Text>

        <ToggleBrands type={"landing"}>
          {topReactedBrands.map((key, index) => {
            return (
              <BrandCard
                index={index}
                key={index}
                brandData={key}
                showReactionsInfo
                showReactionsActions
                dashboard={false}
              />
            );
          })}
        </ToggleBrands>
      </Container>
    </Wrapper>
  );
};
