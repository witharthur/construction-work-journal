import { createTheme } from "@mui/material/styles";

export type ColorMode = "light" | "dark";

export function createAppTheme(mode: ColorMode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#256f5f",
        light: "#3f8d7b",
        dark: "#17483f"
      },
      secondary: {
        main: "#c4812d"
      },
      background:
        mode === "light"
          ? {
              default: "#f6f7f4",
              paper: "#ffffff"
            }
          : {
              default: "#161a1d",
              paper: "#20262a"
            },
      text:
        mode === "light"
          ? {
              primary: "#18201f",
              secondary: "#5d6662"
            }
          : {
              primary: "#eef3ef",
              secondary: "#b8c2bd"
            }
    },
    typography: {
      fontFamily: "\"Inter\", \"Segoe UI\", sans-serif",
      h1: {
        fontSize: "2rem",
        fontWeight: 700,
        letterSpacing: 0
      },
      h2: {
        fontSize: "1.125rem",
        fontWeight: 700,
        letterSpacing: 0
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
        letterSpacing: 0
      }
    },
    shape: {
      borderRadius: 8
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            minHeight: 40
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none"
          }
        }
      }
    }
  });
}
