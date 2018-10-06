import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./components/App.jsx";
import AboutPageContainer from "./components/AboutPage.jsx";

window.addEventListener("load", main);

function main() {
  ReactDOM.render(
    <AppContainer>
      <AboutPageContainer />
    </AppContainer>,
    document.querySelector("#root")
  );
}