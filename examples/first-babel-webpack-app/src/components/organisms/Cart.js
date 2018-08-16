import React from "react";
import { connect } from "react-redux";
const ADD_ARTICLE = "ADD_ARTICLE";

function addArticleToCart(article) {
  return {
    type: ADD_ARTICLE,
    payload: article
  };
}

function cartReducer(state = [], action) {
  if (action.type === ADD_ARTICLE) {
    state = state.concat([action.payload]);
  }
  if (action.type === "REMOVE_ARTICLE") {
    state = state.filter(x => x.id !== action.payload.id);
  }
  return state;
}

const Cart = props => {
  return <div>Warenkorb: {props.cart.length}</div>;
};

export { cartReducer, addArticleToCart };

// map state from store from reducer to props
function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(mapStateToProps)(Cart);
