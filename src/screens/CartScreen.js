import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../components/Message";
import { addToCart } from "../actions/cartActions";
function CartScreen({ match, location, history }) {
  const eventId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("cartItems : ", cartItems);
  useEffect(() => {
    if (eventId) {
      dispatch(addToCart(eventId, qty));
    }
  }, [dispatch, eventId, qty]);

  return <div>Cart</div>;
}

export default CartScreen;
