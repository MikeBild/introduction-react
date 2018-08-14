import React from "react";
import { render } from "react-dom";
import { PersonalData, ArticleList } from "./components/molecules";
import { Layout } from "./components/templates/Layout";

function HelloWorldHead({ color = "red", onFoo = () => ({}) }) {
  return (
    <h1 onClick={e => onFoo("clicked")} style={{ color }}>
      Hello World!
    </h1>
  );
}

render(
  <Layout>
    <HelloWorldHead color="blue" onFoo={msg => console.log(msg)} />
    <PersonalData />
    <ArticleList />
  </Layout>,
  document.getElementById("root")
);

function compose() {
  return () => {};
}

compose();
