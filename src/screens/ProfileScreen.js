import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

// import styles from "assets/jss/material-kit-react/views/loginPage.js";
import styles from "assets/jss/basicsStyle";

// My Backend Config
import Loader from "components/Loader";
import Message from "components/Message";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/UserConstatns";
import { listMyOrders } from "../actions/orderActions";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(styles, {
  table: {
    minWidth: 650,
  },
});

function ProfileScreen({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          // prettier-ignore
          'id': user._id,
          // prettier-ignore
          'name': name,
          // prettier-ignore
          'email': email,
          // prettier-ignore
          'password': password,
        })
      );
      setMessage("");
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem md={4}>
          <form className={classes.form} onSubmit={submitHandler}>
            <CardHeader color="primary" className={classes.cardHeader}>
              <h2>Your Profile</h2>
            </CardHeader>
            {message && <Message message={message} color="danger" />}
            {error && <Message message={error} color="danger" />}
            {loading && (
              // <GridItem>
              <Loader />
              // </GridItem>
            )}
            <CardBody>
              <CustomInput
                labelText="Name"
                id="first"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  disabled: true,
                  required: true,
                  type: "text",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  endAdornment: (
                    <InputAdornment position="end">
                      <People className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <CustomInput
                labelText="Email"
                id="email"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  disabled: true,
                  required: true,
                  type: "email",
                  value: email, //did not add brackets
                  onChange: (e) => setEmail(e.target.value),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <CustomInput
                labelText="Password"
                id="confirmpass"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "password",
                  value: password, //did not add brackets
                  onChange: (e) => setPassword(e.target.value),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className={classes.inputIconsColor}>
                        lock_outline
                      </Icon>
                    </InputAdornment>
                  ),
                  autoComplete: "off",
                }}
              />
              <CustomInput
                labelText="Confirm Password"
                id="pass"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "password",
                  value: confirmPassword,
                  onChange: (e) => setConfirmPassword(e.target.value),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className={classes.inputIconsColor}>
                        lock_outline
                      </Icon>
                    </InputAdornment>
                  ),
                  autoComplete: "off",
                }}
              />
            </CardBody>
            <CardFooter className={classes.cardFooter}>
              <Button color="primary" size="lg" type="submit">
                Update
              </Button>
            </CardFooter>
          </form>
        </GridItem>

        <GridItem md={8}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message color="danger" message={errorOrders} />
          ) : (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Total&nbsp;</TableCell>
                    <TableCell align="center">Paid&nbsp;</TableCell>
                    <TableCell align="center">Details&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      {/* <TableCell component="th" scope="row">
                        {order.name}
                      </TableCell> */}
                      <TableCell align="center">{order._id}</TableCell>
                      <TableCell align="center">
                        {order.createdAt.substring(0, 10)}
                      </TableCell>
                      <TableCell align="center">₹{order.totalPrice}</TableCell>
                      <TableCell align="center">
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="sm"
                          color="info"
                          target="_self"
                          className={classes.navLink}
                          component={RouterLink}
                          to={`/order/${order._id}`}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default ProfileScreen;
