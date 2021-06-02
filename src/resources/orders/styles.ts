import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  ({ palette }) => ({
    info: {
      color: palette.info.main,
    },
    success: {
      color: palette.success.main,
    },
  }),
  { index: 1 }
);
