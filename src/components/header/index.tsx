import { AppBar, Toolbar, Avatar } from "@material-ui/core";
import React from "react";

import { COMPANY_LOGO_URL, COMPANY_NAME } from "../../utils/constants";
import { useStyles } from "./styles";

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appbar} position="sticky" variant="outlined">
      <Toolbar className={classes.toolbar}>
        <Avatar
          alt={COMPANY_NAME}
          className={classes.logo}
          src={COMPANY_LOGO_URL}
          variant="rounded"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
