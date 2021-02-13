import React from "react";

// Imported Component
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

// Cart Icon
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";

// For Select Dropdown
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// Core Component
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  icons: {
    width: "17px",
    height: "17px",
    color: "#FFFFFF",
  },
}));

const ListCart = ({ product, addToCartHandler, qty, setQty }) => {
  const handleChange = (event) => {
    setQty(event.target.value);
  };
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

          {product.countInStock > 0 && (
            <ListItem divider>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  QTY
                </InputLabel>
                <Select
                  native
                  value={qty}
                  onChange={handleChange}
                  label="QTY"
                  inputProps={{
                    id: "outlined-age-native-simple",
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          )}

          <ListItem divider style={{ justifyContent: "center" }}>
            <Button
              onClick={addToCartHandler}
              color="primary"
              size="lg"
              disabled={product.countInStock === 0}
            >
              <AddShoppingCart /> Add to Cart
            </Button>
          </ListItem>
        </Box>
      </Card>
    </>
  );
};

export default ListCart;
