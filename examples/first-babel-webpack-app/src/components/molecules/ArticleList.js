import React from "react";
import PropTypes from "prop-types";
import withLoading from "../enhancements/withLoading";

function ArticleListItem({ article: { id, title = "empty", price = 0.0 } }) {
  return (
    <li key={id}>
      <div>
        <img src="" />
        <h1>{title}</h1>
        <div>{price}€</div>
        <button>Kaufen</button>
      </div>
    </li>
  );
}

function Leer() {
  return <span>Leer</span>;
}

function ArticleList({ articles = [] }) {
  return (
    <ul>
      {articles && articles.length > 0 ? (
        articles.map(article => ArticleListItem({ article }))
      ) : (
        <Leer />
      )}
    </ul>
  );
}

ArticleList.propTypes = {
  articles: PropTypes.array
};

export default withLoading(ArticleList);
