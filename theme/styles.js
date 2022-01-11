export const theme = {
  // COLORS
  CLUEY_DARK: "#000000",
  CLUEY_DARK_GREEN: "#1e4d45",
  CLUEY_SEMI_DARK_GREEN: "#74a59e",
  CLUEY_LIGHT_GREEN: "#497e75",
  CLUEY_LINK_GREEN: "#147e6c",
  CLUEY_GREEN: "#6fcf97",
  CLUEY_NEON_GREEN: "#c5fde3",
  CLUEY_TAN: "#fdf0e2",
  CLUEY_ORANGE_RED: "#d27260",
  CLUEY_WHITE: "#fff",
  CLUEY_BLACK: "#000",
  CLUEY_TEAL: "#c2f1ff",
  CLUEY_GRAY: "#e1e1e1",
  CLUEY_GREY: "#bdbdbd",
  CLUEY_LIGHT_GREY: "#b3b3b3",
  CLUEY_LIGHT_GREY_NORMAL: "#6a6a6a",
  CLUEY_MEDIUM_GREY: "#4f4f4f",
  CLUEY_MEDIUM_DARK_GREY: "#333333",
  CLUEY_DARK_GREY: "#828282",
  CLUEY_VERY_DARK_GREY: "#333333",
  CLUEY_USER_AVATAR: "#27ae60",
  CLUEY_RED: "#eb5757",
  CLUEY_BAR_RED: "#f35757",
  CLUEY_BAR_BLUE: "#4778f4",
  CLUEY_LIME_GREEN: "#D1FBE2",
  CLUEY_PASTEL_BLUE: "#e9ebec",
  CLUEY_LIGHT_SHADE_GRAY: "#ccc",
  CLUEY_PURE_RED: "#FF0000",
  CLUEY_LIGHT_SHADE_RED: "#e0e0e0",
  CLUEY_WHITE_SMOKE: "#f5f5f5",
  CLUEY_APPROX_WHITE: "#fefefe",
  CLUEY_GRAY_HOVER: "#fafafa",
  // FONTS
  CLUEY_LIGHT: 300,
  CLUEY_NORMAL: 400,
  CLUEY_SEMI_BOLD: 500,
  CLUEY_BOLD: 600,
  CLUEY_INTER: "'Inter', sans-serif",
  CLUEY_TEST_FINANCIER_DISPLAY: "TestFinancierDisplay",

  // MEDIA Queries
  CLUEY_SIZE_FULL_MOBILE: `450px`,
  CLUEY_SIZE_MOBILE: `720px`,
  CLUEY_SIZE_TABLET: `920px`,
  CLUEY_SIZE_MOBILE_LG: `1275px`,
  CLUEY_SIZE_BREAK_POINT: `1400px`,

  //Standard media query
  CLUEY_SIZE_EXTRA_LARGE_SCREEN_MAX : "1600px",
  CLUEY_SIZE_EXTRA_LARGE_SCREEN : "1200px",
  CLUEY_SIZE_LARGE_SCREEN : "1024px",
  CLUEY_SIZE_SMALL_SCREEN : "768px",
  CLUEY_SIZE_TABLET_SCREEN : "480px",
  CLUEY_SIZE_MOBILE_INTEMEDIATE_SCREEN : "375px",
  CLUEY_SIZE_MOBILE_SCREEN : "320px",
};

export const responsive = {
  sm: (...args) => css`
    @media (min-width: 750px) {
      ${css(...args)};
    }
  `,
  md: (...args) => css`
    @media (min-width: 960px) {
      ${css(...args)};
    }
  `,
  lg: (...args) => css`
    @media (min-width: 1200px) {
      ${css(...args)};
    }
  `,
  exlg: (...args) => css`
    @media (min-width: 1600px) {
      ${css(...args)};
    }
  `,
};
