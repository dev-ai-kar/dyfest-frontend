import React from "react";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";

import Rating from "components/Rating.js";
const ListInfo = ({ product }) => {
  return (
    <Box>
      <ListItem divider>
        <h2>{product.name}</h2>
      </ListItem>
      <ListItem divider>
        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
          color={"#f8e825"}
        />
      </ListItem>
      <ListItem divider>
        <h5>Price: ₹{product.price}</h5>
      </ListItem>
      <ListItem divider>
        <p>{product.description}</p>
      </ListItem>
    </Box>
  );
};

export default ListInfo;
