import React from "react";
import PropTypes from "prop-types";
import withLoading from "../enhancements/withLoading";
import withLoader from "../enhancements/withLoader";
import ArticleListItem from "./ArticleListItem";

function Leer() {
  return <span>Leer</span>;
}

function ArticleList({ articles = [] }) {
  return (
    <ul>
      {articles && articles.length > 0 ? (
        articles.map(article => (
          <ArticleListItem key={article.id} article={article} />
        ))
      ) : (
        <Leer />
      )}
    </ul>
  );
}

ArticleList.propTypes = {
  articles: PropTypes.array
};

export default withLoader(withLoading(ArticleList));
