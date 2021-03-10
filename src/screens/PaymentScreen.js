import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import CheckoutSteps from "../components/CheckoutSteps";

import { container, title } from "assets/jss/material-kit-react.js";
import radiostyles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

import { savePaymentMethod } from "../actions/cartActions";

const styles = {
  ...radiostyles,
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
};
const useStyles = makeStyles(styles);

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const classes = useStyles();

  const wrapperDiv = classNames(
    classes.checkboxAndRadio,
    classes.checkboxAndRadioHorizontal
  );

  const [paymentMethod, setPaymentMethod] = useState("Paypal"); //create a form to change this state to add more payment options
  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8} style={{ marginTop: "50px" }}>
          <CheckoutSteps step1 step2 step3 />
          <br />
          <form onSubmit={submitHandler}>
            <Card>
              <CardHeader color="primary">
                <h4
                  className={classes.cardTitleWhite}
                  style={{ marginTop: "20px" }}
                >
                  Payment Method
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Your Payment Method is {paymentMethod}
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputLabel style={{ color: "#AAAAAA" }}>
                      Change Payment Method
                    </InputLabel>
                    <div>
                      <div className={wrapperDiv}>
                        <FormControlLabel
                          control={
                            <Radio
                              checked={paymentMethod === "Paypal"}
                              onChange={() => setPaymentMethod("Paypal")}
                              value="Paypal"
                              name="radio button enabled"
                              aria-label="PAYPAL"
                              icon={
                                <FiberManualRecord
                                  className={classes.radioUnchecked}
                                />
                              }
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
                              }
                              classes={{
                                checked: classes.radio,
                              }}
                            />
                          }
                          classes={{
                            label: classes.label,
                          }}
                          label="PayPal"
                        />
                      </div>
                      <div className={wrapperDiv}>
                        <FormControlLabel
                          control={
                            <Radio
                              checked={paymentMethod === "Cash"}
                              onChange={() => setPaymentMethod("Cash")}
                              value="Cash"
                              name="radio button enabled"
                              aria-label="CASH"
                              icon={
                                <FiberManualRecord
                                  className={classes.radioUnchecked}
                                />
                              }
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
                              }
                              classes={{
                                checked: classes.radio,
                              }}
                            />
                          }
                          classes={{
                            label: classes.label,
                          }}
                          label="Cash"
                        />
                      </div>
                      {/* <div className={wrapperDiv}>
                        <FormControlLabel
                          disabled
                          control={
                            <Radio
                              checked={false}
                              value="a"
                              name="radio button disabled"
                              aria-label="B"
                              icon={
                                <FiberManualRecord
                                  className={classes.radioUnchecked}
                                />
                              }
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
                              }
                              classes={{
                                checked: classes.radio,
                              }}
                            />
                          }
                          classes={{
                            label: classes.label,
                            disabled: classes.disabledCheckboxAndRadio,
                          }}
                          label="Disabled Unchecked Radio"
                        />
                      </div>
                      <div className={wrapperDiv}>
                        <FormControlLabel
                          disabled
                          control={
                            <Radio
                              checked={true}
                              value="b"
                              name="radio button disabled"
                              aria-label="B"
                              icon={
                                <FiberManualRecord
                                  className={classes.radioUnchecked}
                                />
                              }
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
                              }
                              classes={{
                                checked: classes.radio,
                              }}
                            />
                          }
                          classes={{
                            label: classes.label,
                            disabled: classes.disabledCheckboxAndRadio,
                          }}
                          label="Disabled Checked Radio"
                        />
                      </div> */}
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">
                  Continue
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default PaymentScreen;
