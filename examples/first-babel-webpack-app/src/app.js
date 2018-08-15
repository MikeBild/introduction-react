import React from "react";
import { render } from "react-dom";
import { PersonalData, ArticleList } from "./components/molecules";
import { Layout } from "./components/templates/Layout";
import SubNav from "./components/templates/SubNav";
import Catch from "./components/enhancements/Catch";

const articles = [
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

function HelloWorldHead({ color = "red", onFoo = () => ({}) }) {
  return (
    <h1 onClick={e => onFoo("clicked")} style={{ color }}>
      Hello World!
    </h1>
  );
}

render(
  <Layout SubNav={SubNav}>
    <HelloWorldHead color="blue" onFoo={msg => console.log(msg)} />
    <PersonalData />
    <Catch>
      <ArticleList articles={articles} isLoading={true} />
    </Catch>
  </Layout>,
  document.getElementById("root")
);
