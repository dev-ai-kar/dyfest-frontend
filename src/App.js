import { BrowserRouter as Router, Route } from "react-router-dom";
import "assets/scss/material-kit-react.scss";
import "./App.css";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

import HeaderLinks from "components/Header/HeaderLinks.js";
import HomeScreen from "./screens/HomeScreen.js";
import EventScreen from "./screens/EventScreen.js";
import CartScreen from "./screens/CartScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import OrderScreen from "./screens/OrderScreen.js";

import UserListScreen from "./screens/UserListScreen.js";
import UserEditScreen from "./screens/UserEditScreen.js";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

function App(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <Router>
      <Header
        brand="DY FEST"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "dark",
        }}
        {...rest}
      />
      <header className="App-header">
        <Button
          style={{ fontSize: 25 }}
          size="large"
          variant="contained"
          color="primary"
        >
          Hello World
        </Button>
      </header>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <main>
          {/* <br /> */}
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/event/:id" component={EventScreen} />
          <Route path="/cart/:id?" component={CartScreen} />

          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          {/* <br /> */}
        </main>
      </div>
      <br />
      <h1>Lets Do It</h1>
      <Footer />
    </Router>
  );
}

export default App;
