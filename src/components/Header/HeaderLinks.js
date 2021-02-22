/*eslint-disable*/
import React from "react";

import { useDispatch, useSelector } from "react-redux";

// react components for routing our app without refresh
import { Link as RouterLink } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";

// @material-ui/icons
import { Apps, AccountBox, ShoppingCart } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

import { logout } from "../../actions/userActions";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const classes = useStyles();
  return (
    <List className={classes.list}>
      {/* dropdownLink */}
      {userInfo ? (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText={userInfo.name}
            buttonProps={{
              className: classes.navLink,
              color: "transparent",
            }}
            buttonIcon={AccountBox}
            dropdownList={[
              <RouterLink to="/profile" className={classes.dropdownLink}>
                Profile
              </RouterLink>,

              <Link onClick={logoutHandler} className={classes.dropdownLink}>
                Logout
              </Link>,
            ]}
          />
        </ListItem>
      ) : (
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            target="_self"
            className={classes.navLink}
            component={RouterLink}
            to="/login"
          >
            <AccountBox className={classes.icons} /> Login
          </Button>
        </ListItem>
      )}

      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_self"
          className={classes.navLink}
          component={RouterLink}
          to="/cart"
        >
          <ShoppingCart className={classes.icons} /> Cart
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Subscribe us on youtube"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://www.youtube.com/kalaraag"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-youtube"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/Kalaraag/"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/kalaraag/"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
