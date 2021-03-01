import React, { useState, useEffect } from "react";
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
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

// import styles from "assets/jss/material-kit-react/views/loginPage.js";
import styles from "assets/jss/basicsStyle";

// My Backend Config
import { Link } from "react-router-dom";
import Loader from "components/Loader";
import Message from "components/Message";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/userActions";

const useStyles = makeStyles(styles);

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

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      //   dispatch(register(name, email, password));
      console.log("Updating..");
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem md={4}>
          <form className={classes.form} onSubmit={submitHandler}>
            <CardHeader color="primary" className={classes.cardHeader}>
              <h2>Update User Profile</h2>
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
                labelText="First Name..."
                id="first"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
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
                labelText="Enter Email..."
                id="email"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
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
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default ProfileScreen;
