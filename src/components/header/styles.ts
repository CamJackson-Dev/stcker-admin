import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(({ palette, breakpoints }) => ({
  appbar: {
    background: palette.background.paper,
    width: "100%",
    padding: "2px 0",
  },
  logo: {
    height: 45,
    width: 160,
    marginLeft: "1rem",
    [breakpoints.down("xs")]: {
      marginLeft: "0",
      height: 30,
      width: 108,
    },
  },
  toolbar: {
    margin: "auto",
    maxWidth: 850,
    width: "100%",
  },
}));
