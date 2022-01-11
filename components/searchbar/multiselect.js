import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { StyledCheckbox, StyledSelect } from "./styles";
import { useEffect, useState } from "react";
import {
  useAddBrandToUserPorfolio,
  useRemoveBrandFromUserPortfolio,
} from "@/mutations";
import { QUERYuserPortfolioWithCategories } from "@/queries";
import { mutate as genericMutate } from "swr";

export const Multiselect = ({ dataBrand, mutate, isBrandInPortfolio }) => {
  const { brand_sub_type, brand_sub_type_id } = dataBrand;

  const handleAddRemoveCategories = async (sub_type_id) => {
    const removingFromPortfolio = isBrandInPortfolio;
    if (!removingFromPortfolio) {
      await useAddBrandToUserPorfolio({
        brand_id: dataBrand.id,
        brand_type: sub_type_id,
      });
    } else {
      await useRemoveBrandFromUserPortfolio({
        brand_id: dataBrand.id,
        brand_type: sub_type_id,
      });
    }

    genericMutate(QUERYuserPortfolioWithCategories);
    mutate && mutate();
  };

  return (
    <StyledSelect
      id={dataBrand.id}
      multiple
      value={[{ brand_sub_type_id, brand_sub_type }]}
    >
      <MenuItem
        value={brand_sub_type_id}
        onClick={() => handleAddRemoveCategories(brand_sub_type_id)}
      >
        <StyledCheckbox checked={isBrandInPortfolio} />
        <ListItemText primary={brand_sub_type} />
      </MenuItem>
    </StyledSelect>
  );
};
