import React from "react";
import { render } from "react-dom";
import PersonalData from "./components/molecules/PersonalData";

function HelloWorldHead({ color = "red", onFoo = () => ({}) }) {
  return (
    <h1 onClick={e => onFoo("clicked")} style={{ color }}>
      Hello World!
    </h1>
  );
}

render(
  <div>
    <HelloWorldHead color="blue" onFoo={msg => console.log(msg)} />
    <PersonalData />
  </div>,
  document.getElementById("root")
);
