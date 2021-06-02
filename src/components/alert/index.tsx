import { Collapse, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useStyles } from "./styles";

interface Props {
  message: string;
  open: boolean;
  onClose: () => void;
  severity: "error" | "info" | "warning" | "success";
}

const CustomAlert: React.FC<Props> = ({ message, open, onClose, severity }) => {
  const classes = useStyles();
  return (
    <Collapse className={classes.root} in={open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
        severity={severity}
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default CustomAlert;
