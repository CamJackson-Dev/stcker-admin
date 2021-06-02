import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    background:
      palette.type === "light"
        ? palette.background.paper
        : palette.background.default,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  button: {
    color: `${palette.common.white} !important`,
    marginBottom: "0.5rem",
  },
  container: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    [breakpoints.down("xs")]: {
      padding: "2rem",
    },
  },
  legend: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  googleBtn: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    textTransform: "none",
    minHeight: 42,
    background: `rgb(66, 133, 244)`,
    color: `${palette.background.paper} !important`,
    padding: 1,
    "&:hover": {
      background: `rgb(66, 133, 244)`,
    },
  },
  divider: {
    border: `1px solid ${palette.divider}`,
    flexGrow: 1,
  },
  dividerGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0.5rem 0",
  },
  icon: {
    fontSize: "2rem !important",
  },
  loading: { margin: "auto" },
}));
