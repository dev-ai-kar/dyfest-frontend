import React from "react";
// import { Nav } from "react-bootstrap";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.js";

import Grid from "@material-ui/core/Grid";

import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/checkoutstepStyle.js";
const useStyles = makeStyles(styles);

function CheckoutSteps({ step1, step2, step3, step4 }) {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <List>
        <ListItem className={classes.listItem}>
          {step1 ? (
            <Button
              color="primary"
              target="_self"
              className={classes.navLink}
              component={Link}
              to="/login"
              style={{ color: "white" }}
              round
            >
              Login
            </Button>
          ) : (
            <Button
              round
              color="primary"
              target="_self"
              className={classes.navLink}
              component={Link}
              to="/login"
              style={{ color: "white" }}
              disabled
            >
              Login
            </Button>
          )}
        </ListItem>

        <ListItem className={classes.listItem}>
          {step2 ? (
            <Button
              round
              color="primary"
              target="_self"
              className={classes.navLink}
              component={Link}
              to="/shipping"
              style={{ color: "white" }}
            >
              Shipping
            </Button>
          ) : (
            <Button
              round
              color="primary"
              target="_self"
              className={classes.navLink}
              component={Link}
              to="/shipping"
              style={{ color: "white" }}
              disabled
            >
              Shipping
            </Button>
          )}
        </ListItem>

        <ListItem className={classes.listItem}>
          {step3 ? (
            <Button
              round
              color="primary"
              target="_self"
              className={classes.navLink}
              component={Link}
              to="/payment"
              style={{ color: "white" }}
            >
              Payment
            </Button>
          ) : (
            <Button
              round
              color="primary"
              target="_self"
              className={classes.navLink}
              component={Link}
              to="/payment"
              style={{ color: "white" }}
              disabled
            >
              Payment
            </Button>
          )}
        </ListItem>

        <ListItem className={classes.listItem}>
          {step4 ? (
            <Button
              round
              color="primary"
              target="_self"
              className={classes.navLink}
              component={Link}
              to="/placeorder"
              style={{ color: "white" }}
            >
              Place Order
            </Button>
          ) : (
            <Button
              round
              color="primary"
              target="_self"
              className={classes.navLink}
              component={Link}
              to="/placeorder"
              style={{ color: "white" }}
              disabled
            >
              Place Order
            </Button>
          )}
        </ListItem>
      </List>
    </Grid>
  );
}

export default CheckoutSteps;
