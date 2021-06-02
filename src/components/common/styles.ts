import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  ({ palette }) => ({
    root: {
      background: palette.background.default,
      minHeight: "100vh",
    },
    info: {
      color: palette.info.main,
    },
    success: {
      color: palette.success.main,
    },
    error: {
      color: palette.error.main,
    },
  }),
  { index: 1 }
);
