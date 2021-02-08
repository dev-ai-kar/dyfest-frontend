import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";

// import products from "../products.js";

// Back Icon
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// List components
import ListInfo from "components/ListInfo.js";
import ListCart from "components/ListCart.js";

import styles from "assets/jss/material-kit-react/views/typographyStyle.js";
const useStyles = makeStyles(styles);

const EventScreen = ({ match }) => {
  const classes = useStyles();

  const [product, setProducts] = useState([]);

  useEffect(() => {
    async function fetchEvent() {
      const { data } = await axios.get(`/api/events/${match.params.id}`);
      setProducts(data);
    }
    fetchEvent();
  }, [match.params.id]);

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="images">
          <Button color="info" round component={Link} to="/">
            <ArrowBackIos /> GO BACK
          </Button>

          <br />
          <GridContainer>
            <GridItem xs={12} md={6}>
              <div className={classes.space50} />
              <img
                src={product.image}
                alt={product.name}
                className={
                  classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid
                }
              />
            </GridItem>
            <GridItem xs={12} md={3}>
              <ListInfo product={product} />
            </GridItem>
            <GridItem xs={12} md={3}>
              <ListCart product={product} />
            </GridItem>
          </GridContainer>
          <GridContainer />
        </div>
        <div className={classes.space50} />
      </div>
    </div>
  );
};

export default EventScreen;
