import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import CustomInput from "components/CustomInput/CustomInput.js";

import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { container, title } from "assets/jss/material-kit-react.js";

// import avatar from "assets/img/faces/marc.jpg";
//new start
import Message from "components/Message.js";
import CheckoutSteps from "components/CheckoutSteps.js";

import Typography from "@material-ui/core/Typography";
import topostyles from "assets/jss/material-kit-react/views/typographyStyle.js";

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

export default function PlaceOrderScreen() {
  const cart = useSelector((state) => state.cart);
  const classes = useStyles();

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = (0.082 * cart.itemsPrice).toFixed(2); //for 8.2% tax
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);
  const placeOrder = () => {
    console.log("Place Order");
  };
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem style={{ marginTop: "50px" }}>
          <CheckoutSteps step1 step2 step3 step4 />
        </GridItem>
      </GridContainer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <br />
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12}>
                  <h3>Shipping</h3>
                  <p>
                    <strong>Shipping: </strong>
                    {cart.shippingAddress.address},{cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.postalCode},{" "}
                    {cart.shippingAddress.country}
                  </p>
                </GridItem>
                <GridItem xs={12}>
                  <h3>Payment Method </h3>
                  <p>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                  </p>
                </GridItem>
                <GridItem xs={12}>
                  <h3>Order Items</h3>
                  {cart.cartItems.length === 0 ? (
                    <Message message="Your Cart is Empty" color="info" />
                  ) : (
                    <div>
                      {cart.cartItems.map((item, index) => (
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
                              {item.qty} X ₹{item.price} =
                            </Typography>
                          </GridItem>
                          <GridItem md={2} xs={8}>
                            <Typography variant="subtitle1">
                              ₹{(item.qty * item.price).toFixed(2)}
                            </Typography>
                          </GridItem>
                          {/* <GridItem xs={12} sm container>
                            <GridItem
                              xs
                              container
                              direction="column"
                              spacing={1}
                            >
                              <GridItem xs>
                                {" "}
                                <Typography gutterBottom variant="subtitle1">
                                  <Link to={`/event/${item.event}`}>
                                    {item.name}
                                  </Link>
                                </Typography>
                              </GridItem>
                            </GridItem>
                          </GridItem> */}
                        </GridContainer>
                      ))}
                    </div>
                  )}
                </GridItem>
              </GridContainer>
              {/* <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company (disabled)"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer> */}
              {/* <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  />
                </GridItem>
              </GridContainer> */}
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Order Summary</h4>
            </CardHeader>
            {/* <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar> */}
            <CardBody>
              <h4 className={classes.cardCategory}>Items: </h4>
              <h4 className={classes.cardTitle}>₹{cart.itemsPrice}</h4>
              <h4 className={classes.cardCategory}>Shipping: </h4>
              <h4 className={classes.cardTitle}>₹{cart.shippingPrice}</h4>
              <h4 className={classes.cardCategory}>Tax Price: </h4>
              <h4 className={classes.cardTitle}>₹{cart.taxPrice}</h4>
              <h4 className={classes.cardCategory}>Total: </h4>
              <h4 className={classes.cardTitle}>₹{cart.totalPrice}</h4>
              {/* <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p> */}
              <Button
                color="primary"
                round
                disabled={cart.cartItems === 0}
                onClick={placeOrder}
              >
                Place Order
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
