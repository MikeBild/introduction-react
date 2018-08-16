import React from "react";
import { addArticleToCart } from "../organisms/Cart";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function ArticleListItem({
  addArticleToCart,
  article: { id, title = "empty", price = 0.0 }
}) {
  return (
    <li key={id}>
      <div>
        <img src="" />
        <h1>{title}</h1>
        <div>{price}€</div>
        <button onClick={() => addArticleToCart({ id, title, price })}>
          Add
        </button>
      </div>
    </li>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addArticleToCart }, dispatch);
}

export default connect(
  state => ({ ...state }),
  mapDispatchToProps
)(ArticleListItem);
