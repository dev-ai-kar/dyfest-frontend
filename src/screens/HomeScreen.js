import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardImage from "components/Card/CardImage.js";

// Get product data
import products from "../products";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function SpacingGrid() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <h1>Latest Events</h1>

        <Grid container justify="center" spacing={7}>
          {products.map((product) => (
            <Grid key={product._id} item>
              <CardImage product={product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
