import { useEffect, useState } from "react";
import { theme } from "@/theme/styles";
import styled from "styled-components";
import { SubtitleBase } from "@/theme/index";
import { DropdownChevron, Row } from "@/shared-components";
import { DropDown, DropDownContent } from "components/dashboard/styles";
import { BrandCard } from "components/brand-card";
import { Line } from "@/settings/styles";
import { AlternativesGrid } from "@/brands-profile-components";
import { useGetBrand } from "@/queries";

const Subtitle = styled(SubtitleBase)`
  font-size: 20px;
  font-weight: ${theme.CLUEY_LIGHT};
  letter-spacing: -0.21px;
  line-height: 1.29;
`

export const Alternatives = ({ alternatives }) => {
  const uniqueAlt = Array.from(
    new Set(alternatives.map((item) => item.id))
  ).map((id) => {
    return alternatives.find((item) => item.id === id);
  });

  const [activeBrand, setActiveBrand] = useState(
    alternatives ? alternatives[0] : 0
  );
  const [dropdownActive, setDropdownActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSelectBrand = async (id) => {
    setLoading(true);
    const { brand } = await useGetBrand(`{id: "${id}"}`);
    setActiveBrand(brand);
    setLoading(false);
  };

  useEffect(async () => {
    if (alternatives && alternatives.length > 0) {
      const { brand } = await useGetBrand(`{id: "${alternatives[0].id}"}`);
      setActiveBrand(brand);
    }
  }, [alternatives]);

  return (
    <>
      <DropDown style={{ marginBottom: 10 }}>
        <Row align={"center"}>
          <Subtitle>
            Alternatives
          </Subtitle>
          <DropdownChevron
            chevronOpen={dropdownActive}
            handler={() => setDropdownActive((prevState) => !prevState)}
          />
        </Row>
        <DropDownContent show={dropdownActive}>
          <Line />
          <BrandCard
            brandData={activeBrand}
            showReactionsInfo
            showReactionsActions
            dashboard={true}
          />
          <AlternativesGrid
            alternatives={uniqueAlt}
            activeBrand={activeBrand}
            handleSelectBrand={handleSelectBrand}
          />
        </DropDownContent>
      </DropDown>
    </>
  );
};
