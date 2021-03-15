import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "components/Loader";
import Message from "components/Message";
import { listEvents, deleteEvent } from "../actions/eventActions";

import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// import ArrowIos from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function EventListScreen({ history, match }) {
  const dispatch = useDispatch();

  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;

  const eventDelete = useSelector((state) => state.eventDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = eventDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listEvents());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      //Delete Product
      dispatch(deleteEvent(id));
    }
  };
  const classes = useStyles();

  const createEventHandler = (event) => {
    // crreae event
  };

  return (
    <div>
      <h1>
        Events{" "}
        <Button color="info" round onClick={createEventHandler} align="center">
          {/* <ArrowIos /> */}
          Create Event &nbsp;<i className="fa fa-plus" aria-hidden="true"></i>
        </Button>
      </h1>
      {/* component={Link} to="/" */}
      {loadingDelete && <Loader />}
      {errorDelete && <Message color="danger" message={errorDelete} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message color="danger" message={error} />
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">NAME</TableCell>
                <TableCell align="center">PRICE&nbsp;</TableCell>
                <TableCell align="center">CATEGORY&nbsp;</TableCell>
                <TableCell align="center">BRAND&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event._id} hover>
                  {/* <TableCell component="th" scope="row">
                        {event.name}
                      </TableCell> */}
                  <TableCell align="center">{event._id}</TableCell>
                  <TableCell align="center">{event.name}</TableCell>
                  <TableCell align="center">{event.price}</TableCell>
                  <TableCell align="center">{event.category}</TableCell>
                  <TableCell align="center">{event.brand}</TableCell>
                  {/* <TableCell align="center">
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </TableCell> */}

                  <TableCell align="center">
                    <Button
                      size="sm"
                      //   color="info"
                      target="_self"
                      className={classes.navLink}
                      component={Link}
                      to={`/admin/event/${event._id}/edit/`}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      className={classes.navLink}
                      onClick={() => {
                        deleteHandler(event._id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default EventListScreen;
