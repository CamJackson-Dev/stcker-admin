import { makeStyles } from "@material-ui/core";

export const useListStyles = makeStyles(
  ({ palette }) => ({
    root: {
      backgroundColor: palette.background.paper,
      margin: "auto",
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    gridTitle: {
      height: "20rem",
    },
    gridList: {
      margin: 0,
    },
    tileBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)",
    },
    placeholder: {
      backgroundColor: palette.grey[300],
      height: "100%",
    },
    price: {
      display: "inline",
      fontSize: "1em",
    },
    link: {
      color: "#fff",
    },
  }),
  { index: 1 }
);
