import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

// core components
import Message from "components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

// Cart Items Details
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// For Select Dropdown
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// Button trash
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import topostyles from "assets/jss/material-kit-react/views/typographyStyle.js";

// card components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";

import { cardTitle } from "assets/jss/material-kit-react.js";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

// CartItem Details Styles
const useStyles = makeStyles((theme) => ({
  cardTitle,

  ...topostyles,
  root: {
    flexGrow: 1,
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  paper: {
    padding: theme.spacing(2),
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
}));

function CartScreen({ match, location, history }) {
  const classes = useStyles();
  const eventId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log("cartItems : ", cartItems);
  useEffect(() => {
    if (eventId) {
      dispatch(addToCart(eventId, qty));
    }
  }, [dispatch, eventId, qty]);

  const removeFromCartHandler = (id) => {
    // console.log("remove", id);
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      <h1>Cart</h1>

      <Grid container>
        <Grid item md={7}>
          {cartItems.length === 0 ? (
            <Message
              message={
                <>
                  Your Cart is Empty &nbsp;{"    "}
                  <Button size="sm" color="info" round component={Link} to="/">
                    <ArrowBackIos />
                    GO BACK
                  </Button>
                </>
              }
              color="info"
            />
          ) : (
            <div className={classes.root}>
              <br />
              <br />
              <Paper className={classes.paper}>
                {cartItems.map((item) => (
                  <Grid container spacing={2} key={item.event}>
                    <Grid item md={3}>
                      <img
                        className={classes.imgRounded + " " + classes.imgFluid}
                        src={item.image}
                        alt={item.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={1}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1">
                            <Link to={`/event/${item.event}`}>{item.name}</Link>
                          </Typography>

                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <InputLabel htmlFor="outlined-age-native-simple">
                              QTY
                            </InputLabel>
                            <Select
                              native
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(item.event, Number(e.target.value))
                                )
                              }
                              label="QTY"
                              inputProps={{
                                id: "outlined-age-native-simple",
                              }}
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                          <IconButton
                            color="default"
                            aria-label="delete"
                            className={classes.margin}
                            onClick={() => removeFromCartHandler(item.event)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <div className={classes.space50} />
                        </Grid>
                      </Grid>
                      <Grid item md={2}>
                        <Typography variant="subtitle1">
                          ₹{item.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Paper>
            </div>
          )}
        </Grid>
        <Grid item md={4}>
          <div className={classes.space50} />
          <Card style={{ width: "100%", marginLeft: "2rem" }}>
            <CardHeader color="success">
              <h4>Total</h4>
              <h5 className={classes.cardTitle} style={{ color: "#FFFFFF" }}>
                Subtotal({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h5>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                ₹{" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h4>
              <p>
                By proceeding you agree to our <br />
                Terms & conditions.
              </p>
              <Button
                color="success"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default CartScreen;
