import { atom } from "recoil";

export const userDataAtom = atom({
  key: "userDataAtom",
  default: {},
});

export const dashboardButtonStateAtom = atom({
  key: "dashboarddashboardButtonStateAtom",
  default: false,
});

export const currentTokenUserAtom = atom({
  key: "currentTokenUserAtom",
  default: "",
});

export const subCategoriesAtom = atom({
  key: "subCategoriesAtom",
  default: [],
});
