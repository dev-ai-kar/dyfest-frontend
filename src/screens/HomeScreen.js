import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; //useSeletor to get specific parts of the state
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Loader from "components/Loader";
import Message from "components/Message";
import CardImage from "components/Card/CardImage.js";
import { listEvents } from "../actions/eventActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function HomeScreen() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const eventList = useSelector((state) => state.eventList);
  const { error, loading, events } = eventList;
  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch]);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <h1>Latest Events</h1>
        <Grid container justify="center" spacing={7}>
          {loading ? (
            <Grid item style={{ marginRight: "104px" }}>
              <Loader />
            </Grid>
          ) : error ? (
            <Message message={error} color="danger" />
          ) : (
            <>
              {events.map((product) => (
                <Grid key={product._id} item>
                  <CardImage product={product} />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
