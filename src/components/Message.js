import React from "react";
import Grid from "@material-ui/core/Grid";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Clearfix from "components/Clearfix/Clearfix.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/notificationsStyles.js";
const useStyles = makeStyles(styles);

export default function Message({ message, color }) {
  const classes = useStyles();
  return (
    <div className={classes.container} id="notifications">
      <br />
      <Clearfix />
      <Grid item>
        <SnackbarContent
          message={
            <span>
              <b>ALERT:</b>
              {message}
            </span>
          }
          close
          color={color}
          icon="info_outline"
        />
      </Grid>
    </div>
  );
}
