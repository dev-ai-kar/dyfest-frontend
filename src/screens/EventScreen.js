import React, { useEffect, useState } from "react";
// @material-ui/core components
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { listEventDetails } from "../actions/eventActions";
// import axios from "axios";
import Loader from "components/Loader";
import Message from "components/Message";
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

const EventScreen = ({ match, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const eventDetails = useSelector((state) => state.eventDetails);
  const { loading, error, event } = eventDetails;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(listEventDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <Button color="info" round component={Link} to="/">
          <ArrowBackIos /> GO BACK
        </Button>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message message={error} color="danger" />
        ) : (
          <div id="images">
            <br />
            <GridContainer>
              <GridItem xs={12} md={6}>
                <div className={classes.space50} />
                <img
                  src={event.image}
                  alt={event.name}
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
                <ListInfo product={event} />
              </GridItem>
              <GridItem xs={12} md={3}>
                <ListCart
                  product={event}
                  addToCartHandler={addToCartHandler}
                  qty={qty}
                  setQty={setQty}
                />
              </GridItem>
            </GridContainer>
            <GridContainer />
          </div>
        )}
        <div className={classes.space50} />
      </div>
    </div>
  );
};

export default EventScreen;
