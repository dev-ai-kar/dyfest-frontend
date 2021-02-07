import React from "react";

// Imported Component
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

// Cart Icon
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";

// Core Component
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/basicsStyle.js";

const useStyles = makeStyles(styles);

const ListCart = ({ product }) => {
  const classes = useStyles();
  return (
    <>
      <br />
      <Card>
        <Box>
          <ListItem>
            <h4>Price: </h4>
          </ListItem>
          <ListItem divider>
            <h4> ₹{product.price}</h4>
          </ListItem>
          <ListItem>
            <h4>Status:</h4>
          </ListItem>
          <ListItem divider>
            <h4>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</h4>
          </ListItem>

          <ListItem divider style={{ justifyContent: "center" }}>
            <Button
              color="primary"
              size="lg"
              disabled={product.countInStock === 0}
            >
              <AddShoppingCart className={classes.icons} /> Add to Cart
            </Button>
          </ListItem>
        </Box>
      </Card>
    </>
  );
};

export default ListCart;
