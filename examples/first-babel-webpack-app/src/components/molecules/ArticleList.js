import React from "react";

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

export default function ArticleList({ articles = [] }) {
  articles = [
    {
      id: 1,
      title: "foo title",
      price: 0.0
    },
    {
      id: 2,
      title: "bar title",
      price: 1.0
    }
  ];

  return (
    <ul>
      {articles.length > 0 ? (
        articles.map(article => ArticleListItem({ article }))
      ) : (
        <Leer />
      )}
    </ul>
  );
}
