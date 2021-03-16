import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "components/Loader";
import Message from "components/Message";
import { listOrders } from "../actions/orderActions";

import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const classes = useStyles();

  return (
    <div>
      <h1>Orders</h1>
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
                <TableCell align="center">USER</TableCell>
                <TableCell align="center">DATE&nbsp;</TableCell>
                <TableCell align="center">TOTAL PRICE&nbsp;</TableCell>
                <TableCell align="center">PAID&nbsp;</TableCell>
                <TableCell align="center">DELIVERED&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id} hover>
                  {/* <TableCell component="th" scope="row">
                        {order.name}
                      </TableCell> */}
                  <TableCell align="center">{order._id}</TableCell>
                  <TableCell align="center">
                    {order.user && order.user.name}
                  </TableCell>
                  <TableCell align="center">
                    {order.createdAt.substring(0, 10)}
                  </TableCell>
                  <TableCell align="center">₹{order.totalPrice}</TableCell>
                  <TableCell align="center">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      size="sm"
                      color="info"
                      target="_self"
                      className={classes.navLink}
                      component={Link}
                      to={`/order/${order._id}`}
                    >
                      Details
                    </Button>
                    {/* <Button
                      size="sm"
                      color="danger"
                      className={classes.navLink}
                      onClick={() => {
                        deleteHandler(user._id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button> */}
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

export default OrderListScreen;
