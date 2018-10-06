import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./components/App.jsx";

window.addEventListener("load", main);

function main() {
  ReactDOM.render(
    <AppContainer>
      Error Page
    </AppContainer>,
    document.querySelector("#root")
  );
}