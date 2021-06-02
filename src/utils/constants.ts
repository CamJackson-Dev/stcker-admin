import companyLogo from "./images/logo-light.png";
import sticker from "./images/logo.jpg";

export const COMPANY_NAME = "Stcker";

export const COMPANY_LOGO_URL = companyLogo;
export const STICKER_URL = sticker;

export const BREAKPOINTS = {
  xs: 0,
  sm: 500,
  md: 768,
  lg: 1000,
  xl: 1300,
};

export const TOAST_OPTIONS = {
  error: {
    style: {
      background: "rgb(253, 236, 234)",
      color: "rgb(97, 26, 21)",
      fontFamily: "Roboto",
    },
  },
  success: {
    style: {
      background: "rgb(237, 247, 237)",
      color: "rgb(30, 70, 32)",
      fontFamily: "Roboto",
    },
  },
};
