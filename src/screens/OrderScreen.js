import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import CustomInput from "components/CustomInput/CustomInput.js";

// import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
// import CardFooter from "components/Card/CardFooter.js";
import { container, title } from "assets/jss/material-kit-react.js";

// import avatar from "assets/img/faces/marc.jpg";
//new start
import Message from "components/Message.js";
// import CheckoutSteps from "components/CheckoutSteps.js";

import Typography from "@material-ui/core/Typography";
import topostyles from "assets/jss/material-kit-react/views/typographyStyle.js";

import { getOrderDetails } from "../actions/orderActions";

import Loader from "components/Loader";

const styles = {
  ...topostyles,
  container,
  title,
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  root: {
    flexGrow: 1,
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  paper: {
    // padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600, //500
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
};

const useStyles = makeStyles(styles);

export default function OrderScreen({ match }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const classes = useStyles();

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }
  useEffect(() => {
    if (!order || order._id !== Number(orderId)) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message color="danger" message={error} />
  ) : (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <br />
          <Card>
            <CardHeader color="primary">
              <h2 className={classes.cardTitleWhite}>Order: {order._id}</h2>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12}>
                  <h3>Shipping</h3>
                  <p>
                    <strong>Name: </strong> {order.user.name.toUpperCase()}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Shipping: </strong>
                    {order.shippingAddress.address},{order.shippingAddress.city}
                    , {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message
                      color="success"
                      message={<>Delivered at {order.deliveredAt}</>}
                    />
                  ) : (
                    <Message color="warning" message={<>Not Delivered</>} />
                  )}
                </GridItem>
                <GridItem xs={12}>
                  <h3>Payment Method </h3>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message
                      color="success"
                      message={<>Paid on {order.paidAt}</>}
                    />
                  ) : (
                    <Message color="warning" message={<>Not Paid</>} />
                  )}
                </GridItem>
                <GridItem xs={12}>
                  <h3>Order Items</h3>
                  {order.orderItems.length === 0 ? (
                    <Message message="Your order is Empty" color="info" />
                  ) : (
                    <div>
                      {order.orderItems.map((item, index) => (
                        <GridContainer spacing={2} key={item.event}>
                          <GridItem md={2}>
                            <img
                              className={
                                classes.imgRounded + " " + classes.imgFluid
                              }
                              src={item.image}
                              alt={item.name}
                            />
                          </GridItem>
                          <GridItem md={6}>
                            {" "}
                            <Typography gutterBottom variant="subtitle1">
                              <Link to={`/event/${item.event}`}>
                                {item.name}
                              </Link>
                            </Typography>
                          </GridItem>
                          <GridItem md={2} xs={4}>
                            <Typography variant="subtitle1">
                              {item.qty} X ₹{item.price} {" ="}
                            </Typography>
                          </GridItem>
                          <GridItem md={2} xs={8}>
                            <Typography variant="subtitle1">
                              ₹{(item.qty * item.price).toFixed(2)}
                            </Typography>
                          </GridItem>
                        </GridContainer>
                      ))}
                    </div>
                  )}
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4} style={{ marginTop: "50px" }}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Order Summary</h4>
            </CardHeader>

            <CardBody>
              <h4 className={classes.cardCategory}>Items: </h4>
              <h4 className={classes.cardTitle}>₹{order.itemsPrice}</h4>
              <h4 className={classes.cardCategory}>Shipping: </h4>
              <h4 className={classes.cardTitle}>₹{order.shippingPrice}</h4>
              <h4 className={classes.cardCategory}>Tax Price: </h4>
              <h4 className={classes.cardTitle}>₹{order.taxPrice}</h4>
              <h4 className={classes.cardCategory}>Total: </h4>
              <h4 className={classes.cardTitle}>
                <strong>₹{order.totalPrice}</strong>
              </h4>

              <div>{error && <Message message={error} color="danger" />}</div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
