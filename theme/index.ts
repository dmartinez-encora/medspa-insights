"use client";
import { createTheme, Shadows } from "@mui/material/styles";
import {
  ERROR,
  GREY,
  INFO,
  PRIMARY,
  SUCCESS,
  TEXT_PRIMARY_DARK,
  TEXT_SECONDARY,
  TEXT_TERTIARY,
  VIOLET,
  WARNING,
  WHITE,
} from "./colorPalette";

const theme = createTheme({
  shadows: Array(25).fill("none") as Shadows,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          py: 1,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "24px",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px !important",
          borderColor: GREY[30],
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 16,
          "&:last-child": {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "12px !important",
          background: WHITE,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          lineHeight: "24px",
          fontWeight: "bold",
          textTransform: "unset",
          borderRadius: "12px",
        },
        contained: {
          height: "56px",
          color: WHITE,
          borderRadius: "16px",
        },
        outlined: {
          height: "56px",
          border: "2px solid",
          color: VIOLET[90],
          borderRadius: "16px",
          "&:hover": {
            borderWidth: "2px",
          },
        },
        sizeSmall: {
          fontSize: "0.875rem !important", // required to override default MuI text styles
          fontWeight: "700 !important",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          lineHeight: "24px",
          fontWeight: "normal",
        },
        label: {
          paddingRight: "10px",
          paddingLeft: "10px",
        },
        labelMedium: {
          fontSize: "1rem",
          lineHeight: "24px",
        },
        labelSmall: {
          fontSize: "0.875rem",
          lineHeight: "24px",
          fontWeight: 600,
        },
        sizeSmall: {
          height: 28,
        },
        icon: {
          marginLeft: "10px",
          marginRight: "-6px",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        thumb: {
          background: WHITE,
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
        },
      },
    },
  },
  palette: {
    background: {
      default: GREY[10],
      paper: WHITE,
    },
    text: {
      primary: TEXT_PRIMARY_DARK,
      secondary: TEXT_SECONDARY,
      disabled: TEXT_TERTIARY,
    },
    secondary: {
      main: GREY[70],
      light: GREY[60],
    },
    primary: {
      main: PRIMARY,
    },
    success: {
      main: SUCCESS,
    },
    error: {
      main: ERROR,
    },
    warning: {
      main: WARNING,
    },
    info: {
      main: INFO,
    },
    grey: {
      800: GREY[80],
      700: GREY[70],
      600: GREY[60],
      500: GREY[50],
      400: GREY[40],
      300: GREY[30],
      200: GREY[20],
      100: GREY[10],
    },
  },
});
export default theme;
